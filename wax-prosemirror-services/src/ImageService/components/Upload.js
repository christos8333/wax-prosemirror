import { v4 as uuidv4 } from 'uuid';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

const insertImage = (urls, view, placeholderPlugin) => {
  for (let i = 0; i < urls.length; i += 1) {
    const { state } = view;

    const id = {};

    const { tr } = state;
    if (!tr.selection.empty) tr.deleteSelection();

    tr.setMeta(placeholderPlugin, {
      add: { id, pos: tr.selection.from },
    });

    view.dispatch(tr);
    const pos = findPlaceholder(view.state, id, placeholderPlugin);

    if (pos == null) {
      return;
    }

    view.dispatch(
      state.tr
        .replaceWith(
          pos,
          pos,
          view.state.schema.nodes.image.create({
            id: uuidv4(),
            src: urls[i].source,
            fileid: urls[i].id,
          }),
        )
        .setMeta(placeholderPlugin, { remove: { id } }),
    );
  }
};

export default insertImage;
