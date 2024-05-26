import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-core';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

export default (view, fileUpload, placeholderPlugin, context) => file => {
  // const { state } = view;
  const trackChange = context.app.config.get('config.EnableTrackChangeService');
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
  const { tr } = context.pmViews.main.state;

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

      let pos = findPlaceholder(view.state, id, placeholderPlugin);
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) {
        return;
      }

      // if paragraph is empty don't break into new line
      if (context.pmViews.main.state.doc.resolve(pos).parent.nodeSize === 2) {
        pos -= 1;
      }

      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder

      context.setOption({ uploading: false });
      context.pmViews.main.dispatch(
        context.pmViews.main.state.tr
          .replaceWith(
            pos,
            pos,
            context.pmViews.main.state.schema.nodes.image.create({
              src: url,
              id: uuidv4(),
              extraData,
              'aria-describedby': uuidv4(),
            }),
          )
          .setMeta(placeholderPlugin, { remove: { id } }),
      );
    },
    () => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
      context.setOption({ uploading: false });
    },
  );
};
