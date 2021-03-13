const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

export default (view, fileUpload, placeholderPlugin) => file => {
  const { state } = view;

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const { tr } = state;
  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(placeholderPlugin, {
    add: { id, pos: tr.selection.from },
  });

  view.dispatch(tr);
  fileUpload(file).then(
    url => {
      const pos = findPlaceholder(view.state, id, placeholderPlugin);
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) {
        return;
      }
      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder
      view.dispatch(
        state.tr
          .replaceWith(
            pos,
            pos,
            // view.state.schema.nodes.image.create({
            //   src: url,
            // }),
            view.state.schema.nodes.image.create({
              src: url,
            }),
          )
          .setMeta(placeholderPlugin, { remove: { id } }),
      );
    },
    () => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
    },
  );
};
