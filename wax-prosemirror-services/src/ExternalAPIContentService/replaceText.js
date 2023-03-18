import { DOMParser } from 'prosemirror-model';
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body;
};

const selectionToInsertionEnd = (tr, startLen, bias) => {
  const last = tr.steps.length - 1;

  if (last < startLen) {
    return;
  }

  const step = tr.steps[last];

  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) {
    return;
  }

  const map = tr.mapping.maps[last];
  let end = 0;

  map.forEach((_from, _to, _newFrom, newTo) => {
    if (end === 0) {
      end = newTo;
    }
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
};

export default (
  view,
  ExternalAPIContentTransformation,
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

  ExternalAPIContentTransformation(data).then(
    text => {
      const pos = findPlaceholder(view.state, id, placeholderPlugin);

      if (pos == null) {
        return;
      }
      const parser = DOMParser.fromSchema(
        context.pmViews.main.state.config.schema,
      );
      const options =
        text.includes('<ul>') || text.includes('ol')
          ? {}
          : {
              preserveWhitespace: 'full',
            };
      const parsedContent = parser.parse(
        elementFromString(text.replace(/^\s+|\s+$/g, '')),
        options,
      );

      const newTr = context.pmViews.main.state.tr;

      newTr
        .replaceWith(pos - 1, pos - 1, parsedContent)
        .setMeta(placeholderPlugin, { remove: { id } });

      selectionToInsertionEnd(newTr, newTr.steps.length - 1, 1);
      context.pmViews.main.dispatch(newTr);
    },

    () => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
    },
  );
};
