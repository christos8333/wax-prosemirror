import { TextSelection } from 'prosemirror-state';
export const replaceSelectedText = (view, transformedText) => {
  let state = view.state;
  let tr = state.tr;

  const { from, to } = tr.selection;

  // Check if 'from' and 'to' are within the document size
  if (from > state.doc.content.size || to > state.doc.content.size) {
    console.error("Position out of range");
    return;
  }

  // Delete the selected text if any
  if (from !== to) {
    tr = tr.delete(from, to);
  }

  // Fetch the most recent state again
  state = view.state;

  // Create a new text node with the transformed text
  const newText = state.schema.text(transformedText);

  // Replace the selected text with the new text
  tr = tr.replaceWith(from, from, newText);  // Note: 'to' is replaced with 'from'

  // Dispatch the transaction to update the state
  view.dispatch(tr);

  // Fetch the most recent state again
  state = view.state;

  // Update the selection to the end of the new text
  const newTo = from + transformedText.length;
  const newSelection = TextSelection.create(state.doc, newTo, newTo);
  tr = state.tr.setSelection(newSelection);

  // Dispatch the final transaction to update the state
  view.dispatch(tr);
};
