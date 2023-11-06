import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-core';
import { Fragment } from 'prosemirror-model';
import { findWrapping } from 'prosemirror-transform';

const createEmptyParagraph = (context, newAnswerId) => {
  if (context.pmViews[newAnswerId]) {
    context.pmViews[newAnswerId].dispatch(
      context.pmViews[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          context.pmViews[newAnswerId].state.selection.$anchor,
          context.pmViews[newAnswerId].state.selection.$head,
        ),
      ),
    );
    if (context.pmViews[newAnswerId].dispatch) {
      const type = context.pmViews.main.state.schema.nodes.paragraph;
      context.pmViews[newAnswerId].dispatch(
        context.pmViews[newAnswerId].state.tr
          .insert(0, type.create())
          .setMeta('exludeToHistoryFromOutside', true),
      );
    }
    context.pmViews[newAnswerId].dispatch(
      context.pmViews[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          context.pmViews[newAnswerId].state.selection.$anchor,
          context.pmViews[newAnswerId].state.selection.$head,
        ),
      ),
    );
    context.pmViews[newAnswerId].focus();
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

const createOptions = (main, context, parentType, questionType, answerType) => {
  checkifEmpty(main);
  const { state, dispatch } = main;
  /* Create Wrapping */
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);
  const { tr } = main.state;

  const wrapping = range && findWrapping(range, parentType, { id: uuidv4() });
  if (!wrapping) return false;
  tr.wrap(range, wrapping);

  const map = tr.mapping.maps[0];
  let newPos = 0;
  map.forEach((_from, _to, _newFrom, newTo) => {
    newPos = newTo;
  });

  tr.setSelection(TextSelection.create(tr.doc, range.$to.pos));

  const question = questionType.create({ id: uuidv4() }, Fragment.empty);

  /* create First Option */
  const firstOption = answerType.create({ id: uuidv4() }, Fragment.empty);

  /* create Second Option */
  const secondOption = answerType.create({ id: uuidv4() }, Fragment.empty);
  tr.replaceSelectionWith(question);
  tr.replaceSelectionWith(firstOption);
  tr.setSelection(TextSelection.create(tr.doc, newPos + 1));
  tr.replaceSelectionWith(secondOption);
  dispatch(tr);
  setTimeout(() => {
    context.pmViews[question.attrs.id].focus();
    createEmptyParagraph(context, firstOption.attrs.id);
    createEmptyParagraph(context, secondOption.attrs.id);
    createEmptyParagraph(context, question.attrs.id);
  }, 50);

  return true;
};

export default {
  createEmptyParagraph,
  checkifEmpty,
  createOptions,
};
