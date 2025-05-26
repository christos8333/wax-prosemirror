import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-core';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

export default (view, fileUpload, placeholderPlugin, context, app) => file => {
  // const { state } = view;
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

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  let { tr } = context.pmViews.main.state;

  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(placeholderPlugin, {
    add: { id, pos: tr.selection.from },
  });

  view.dispatch(tr);

  fileUpload(file).then(
    fileData => {
      let url = fileData;
      let extraData = {};
      if (typeof fileData === 'object') {
        url = fileData.url;
        extraData = fileData.extraData;
      }

      const pos = findPlaceholder(view.state, id, placeholderPlugin);

      if (pos == null) {
        return; // Placeholder was removed (e.g., content deleted)
      }

      const { state, dispatch } = context.pmViews.main;
      const { schema } = state;
      const resolved = state.doc.resolve(pos);
      const { parent } = resolved;

      const isEmptyParagraph =
        parent.type.name === 'paragraph' && parent.content.size === 0;

      const imageNode = schema.nodes.image.create({
        src: url,
        id: uuidv4(),
        extraData,
        ...(showLongDesc ? { 'aria-describedby': uuidv4() } : {}),
      });

      if (isEmptyParagraph) {
        const from = resolved.before(); // Start of paragraph
        const to = resolved.after(); // End of paragraph
        tr = tr.replaceWith(from, to, imageNode);
      } else {
        tr = tr.replaceWith(pos, pos, imageNode);
      }

      tr.setMeta(placeholderPlugin, { remove: { id } });

      context.setOption({ uploading: false });
      dispatch(tr);
    },
    () => {
      // On failure, just clean up the placeholder
      view.dispatch(
        context.pmViews.main.state.tr.setMeta(placeholderPlugin, {
          remove: { id },
        }),
      );
      context.setOption({ uploading: false });
    },
  );
};
