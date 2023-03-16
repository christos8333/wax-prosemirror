import { v4 as uuidv4 } from 'uuid';
import { DOMParser } from 'prosemirror-model';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body;
};

export default (
  view,
  AnyStyleTransformation,
  placeholderPlugin,
  context,
) => data => {
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

  AnyStyleTransformation(data).then(
    text => {
      const pos = findPlaceholder(view.state, id, placeholderPlugin);
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) {
        return;
      }
      const parser = DOMParser.fromSchema(
        context.pmViews.main.state.config.schema,
      );
      const parsedContent = parser.parse(elementFromString(text));
      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder
      context.pmViews[context.activeViewId].dispatch(
        context.pmViews[context.activeViewId].state.tr
          .replaceWith(pos, pos, parsedContent)
          .setMeta(placeholderPlugin, { remove: { id } }),
      );
    },

    () => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
    },
  );
};
