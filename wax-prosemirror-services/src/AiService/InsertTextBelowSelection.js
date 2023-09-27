import { TextSelection } from 'prosemirror-state';

const insertTextBelowSelection = (view, transformedText) => {
  let { state } = view;
  let { tr } = state;

  const { to } = tr.selection;

  // Check if 'to' is within the document size
  if (to > state.doc.content.size) {
    console.error('Position out of range');
    return;
  }

  // Fetch the most recent state again
  state = view.state;

  // Create a new paragraph node with the transformed text
  const paragraph = state.schema.nodes.paragraph.create(
    {},
    state.schema.text(transformedText),
  );

  // Insert the new paragraph node below the selection
  tr = tr.insert(to + 1, paragraph);

  // Dispatch the transaction to update the state
  view.dispatch(tr);

  // Fetch the most recent state again
  state = view.state;

  // Update the selection to the end of the new text
  const newTo = to + transformedText.length + 1; // +1 for the paragraph node
  const newSelection = TextSelection.create(state.doc, newTo, newTo);
  tr = state.tr.setSelection(newSelection);

  // Dispatch the final transaction to update the state
  view.dispatch(tr);
};

export default insertTextBelowSelection;
