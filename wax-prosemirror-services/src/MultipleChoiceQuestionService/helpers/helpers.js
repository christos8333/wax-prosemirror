import { TextSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-utilities';

const createEmptyParagraph = (context, newAnswerId) => {
  if (context.view[newAnswerId]) {
    context.view[newAnswerId].dispatch(
      context.view[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          context.view[newAnswerId].state.selection.$anchor,
          context.view[newAnswerId].state.selection.$head,
        ),
      ),
    );
    if (context.view[newAnswerId].dispatch) {
      const type = context.view.main.state.schema.nodes.paragraph;
      context.view[newAnswerId].dispatch(
        context.view[newAnswerId].state.tr.insert(0, type.create()),
      );
    }
    context.view[newAnswerId].dispatch(
      context.view[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          context.view[newAnswerId].state.selection.$anchor,
          context.view[newAnswerId].state.selection.$head,
        ),
      ),
    );
    context.view[newAnswerId].focus();
  }
};

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
  if (state.selection.constructor.name === 'GapCursor') {
    Commands.simulateKey(view, 13, 'Enter');
    setTimeout(() => {
      view.focus();
    });
  }
};

export default {
  createEmptyParagraph,
  checkifEmpty,
};
