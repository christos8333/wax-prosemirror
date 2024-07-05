import { DOMParser } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;
  const doc = new window.DOMParser().parseFromString(wrappedValue, 'text/html');
  return doc.body;
};

const replaceSelectedText = (view, htmlString, replace = false) => {
  if (!htmlString) return;
  const { state } = view;
  const { tr } = state;
  const { from, to } = tr.selection;

  const parser = DOMParser.fromSchema(state.schema);
  const parsedContent = parser.parse(elementFromString(htmlString));

  replace && from !== to
    ? tr.delete(from, to).insert(from, parsedContent)
    : tr.insert(to, parsedContent);

  view.dispatch(tr);

  try {
    const currentState = view.state;
    const newFrom = replace ? from : to;
    const newTo = newFrom + parsedContent.content.size;

    const docSize = currentState.doc.content.size;
    const safeNewTo = Math.min(newTo, docSize);

    const newStateTr = currentState.tr.setSelection(
      TextSelection.create(currentState.doc, safeNewTo, safeNewTo),
    );

    view.dispatch(newStateTr);
    view.focus();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update selection:', error);
  }
};

export default replaceSelectedText;
