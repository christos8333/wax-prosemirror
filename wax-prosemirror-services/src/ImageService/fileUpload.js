import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-core';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const pluginState = placeholderPlugin.getState(state);
  if (!pluginState || !pluginState.decorations) return null;

  const found = pluginState.decorations.find(
    null,
    null,
    spec => spec.id === id,
  );
  return found.length ? found[0].from : null;
};

const findPlaceholderInTracking = (state, id, placeholderPlugin) => {
  const pluginState = placeholderPlugin.getState(state);
  if (!pluginState || !pluginState.placeholders) return null;

  return pluginState.placeholders.get(id) || null;
};

// Helper to find a safe insertion position near the original
const findSafeInsertionPos = (state, targetPos) => {
  const doc = state.doc;

  // Clamp to valid range
  let pos = Math.min(Math.max(0, targetPos), doc.content.size);

  // Try the target position first
  try {
    const resolved = doc.resolve(pos);
    if (
      resolved.parent.type.isTextblock ||
      resolved.parent.type.name === 'paragraph'
    ) {
      return pos;
    }
  } catch (e) {
    // Position invalid
  }

  // Search backwards for a valid position
  while (pos > 0) {
    try {
      const resolved = doc.resolve(pos);
      if (
        resolved.parent.type.isTextblock ||
        resolved.parent.type.name === 'paragraph'
      ) {
        return pos;
      }
      pos--;
    } catch (e) {
      pos--;
    }
  }

  // Search forwards
  pos = Math.min(targetPos, doc.content.size);
  while (pos < doc.content.size) {
    try {
      const resolved = doc.resolve(pos);
      if (
        resolved.parent.type.isTextblock ||
        resolved.parent.type.name === 'paragraph'
      ) {
        return pos;
      }
      pos++;
    } catch (e) {
      pos++;
    }
  }

  // Last resort: current selection or end of doc
  return state.selection.from;
};

export default (view, fileUpload, placeholderPlugin, context, app) => file => {
  const trackChange = app.config.get('config.EnableTrackChangeService');
  const imageConfig = app.config.get('config.ImageService');
  const showLongDesc = imageConfig && imageConfig.showLongDesc;

  if (trackChange?.enabled)
    if (
      context.pmViews.main.state.doc.resolve(
        context.pmViews.main.state.tr.selection.from,
      ).parent.nodeSize !== 2
    ) {
      Commands.simulateKey(context.pmViews.main, 13, 'Enter');
    }

  const placeholderId = uuidv4();
  const initialPos = context.pmViews.main.state.tr.selection.from;

  let { tr } = context.pmViews.main.state;
  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(placeholderPlugin, {
    add: { id: placeholderId, pos: initialPos },
  });
  view.dispatch(tr);

  console.log(
    `Starting upload for placeholder ${placeholderId} at position ${initialPos}`,
  );

  fileUpload(file).then(
    fileData => {
      let url = fileData;
      let extraData = {};
      if (typeof fileData === 'object') {
        url = fileData.url;
        extraData = fileData.extraData;
      }

      const { state, dispatch } = context.pmViews.main;
      const { schema } = state;

      // Try multiple strategies to find where to insert the image
      let insertPos = null;

      // Strategy 1: Find the decoration
      insertPos = findPlaceholder(state, placeholderId, placeholderPlugin);

      // Strategy 2: Check if placeholder is still tracked (even if decoration is gone)
      if (insertPos === null) {
        const trackedPlaceholder = findPlaceholderInTracking(
          state,
          placeholderId,
          placeholderPlugin,
        );
        if (trackedPlaceholder) {
          console.log(
            `Decoration missing but placeholder tracked, finding safe position near ${trackedPlaceholder.originalPos}`,
          );
          insertPos = findSafeInsertionPos(
            state,
            trackedPlaceholder.originalPos,
          );
        }
      }

      // Strategy 3: Fallback to current selection or end of document
      if (insertPos === null) {
        console.warn('Placeholder completely lost, using fallback position');
        insertPos = state.selection.from;
      }

      console.log(
        `Inserting image at position ${insertPos} for placeholder ${placeholderId}`,
      );

      const imageNode = schema.nodes.image.create({
        src: url,
        id: uuidv4(),
        extraData,
        ...(showLongDesc ? { 'aria-describedby': uuidv4() } : {}),
      });

      try {
        const resolved = state.doc.resolve(insertPos);
        const { parent } = resolved;
        const tr = state.tr;

        // Handle different insertion contexts
        if (parent.type.name === 'paragraph' && parent.content.size === 0) {
          // Replace empty paragraph
          const from = resolved.before();
          const to = resolved.after();
          tr.replaceWith(from, to, imageNode);
        } else if (parent.type.isTextblock) {
          // Insert in text block
          tr.insert(insertPos, imageNode);
        } else {
          // Create new paragraph with image
          const paragraphWithImage = schema.nodes.paragraph.create(
            {},
            imageNode,
          );
          tr.insert(insertPos, paragraphWithImage);
        }

        // Always remove the placeholder
        tr.setMeta(placeholderPlugin, { remove: { id: placeholderId } });

        // Add debug metadata
        tr.setMeta('imageUpload', {
          action: 'success',
          placeholderId,
          insertPos,
          timestamp: Date.now(),
        });

        context.setOption({ uploading: false });
        dispatch(tr);

        console.log(
          `Successfully inserted image for placeholder ${placeholderId}`,
        );
      } catch (error) {
        console.error('Failed to insert image:', error);

        // Clean up placeholder even on failure
        const cleanupTr = state.tr.setMeta(placeholderPlugin, {
          remove: { id: placeholderId },
        });
        context.setOption({ uploading: false });
        dispatch(cleanupTr);
      }
    },
    error => {
      console.error('Upload failed:', error);

      // Always clean up placeholder on upload failure
      const currentState = context.pmViews.main.state;
      const trFailure = currentState.tr.setMeta(placeholderPlugin, {
        remove: { id: placeholderId },
      });
      view.dispatch(trFailure);
      context.setOption({ uploading: false });
    },
  );
};
