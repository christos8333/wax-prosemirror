import { DOMParser } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body;
};

const replaceSelectedText = (view, responseText, replace = false) => {
  let { state } = view;
  let { tr } = state;
  const { from, to } = tr.selection;
  const paragraphNodes = [];
  const parser = DOMParser.fromSchema(state.config.schema);

  if (from > state.doc.content.size || to > state.doc.content.size) {
    return;
  }

  let transformedText = state.schema.text(responseText);

  if (responseText.includes('<ul>') || responseText.includes('ol')) {
    transformedText = parser.parse(
      elementFromString(responseText.replace(/^\s+|\s+$/g, '')),
      {},
    );
  }

  if (responseText.includes('\n\n')) {
    responseText.split('\n\n').forEach(element => {
      paragraphNodes.push(
        parser.parse(elementFromString(element.replace(/\n/g, '<br />')), {
          preserveWhitespace: true,
        }),
      );
    });
  }

  const finalReplacementText =
    paragraphNodes.length !== 0 ? paragraphNodes : transformedText;

  if (replace) {
    if (from !== to) {
      tr = tr.delete(from, to);
    }
    tr = tr.replaceWith(from, from, finalReplacementText);
  } else {
    tr = tr.insert(to, finalReplacementText);
  }

  view.dispatch(tr);

  // Fetch the most recent state again
  state = view.state;

  // Update the selection to the end of the new text
  const newFrom = replace ? from : to;
  const newTo = newFrom + responseText.length;
  const cursorPosition = paragraphNodes.length !== 0 ? newTo + 2 : newTo;
  const newSelection = TextSelection.create(
    state.doc,
    cursorPosition,
    cursorPosition,
  );
  tr = state.tr.setSelection(newSelection);

  // Dispatch the final transaction to update the state
  view.dispatch(tr);
  view.focus();
};

export default replaceSelectedText;
