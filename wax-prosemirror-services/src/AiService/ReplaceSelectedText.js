import { DOMParser } from 'prosemirror-model';
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform';
import { Selection, TextSelection } from 'prosemirror-state';

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body;
};

const replaceSelectedText = (view, transformedText) => {
  let { state } = view;
  let { tr } = state;

  const { from, to } = tr.selection;

  // Check if 'from' and 'to' are within the document size
  if (from > state.doc.content.size || to > state.doc.content.size) {
    console.error('Position out of range');
    return;
  }

  // Delete the selected text if any
  if (from !== to) {
    tr = tr.delete(from, to);
  }

  // Fetch the most recent state again
  state = view.state;

  const paragraphNodes = [];

  if (transformedText.includes('\n\n')) {
    transformedText.split('\n\n').forEach(element => {
      paragraphNodes.push(
        state.schema.nodes.paragraph.create(
          {
            preserveWhitespace: 'full',
          },
          state.schema.text(element),
        ),
      );
    });
  }

  const newText = state.schema.nodes.paragraph.create(
    {
      preserveWhitespace: 'full',
    },
    state.schema.text(transformedText),
  );

  const finalReplacementText =
    paragraphNodes.length !== 0 ? paragraphNodes : newText;

  // Replace the selected text with the new text
  tr = tr.replaceWith(from, from, finalReplacementText); // Note: 'to' is replaced with 'from'

  // Dispatch the transaction to update the state
  view.dispatch(tr);

  // Fetch the most recent state again
  state = view.state;

  // Update the selection to the end of the new text
  const newTo = from + transformedText.length;
  const newSelection = TextSelection.create(state.doc, newTo + 2, newTo + 2);
  tr = state.tr.setSelection(newSelection);

  // Dispatch the final transaction to update the state
  view.dispatch(tr);
  view.focus();
};

export default replaceSelectedText;
