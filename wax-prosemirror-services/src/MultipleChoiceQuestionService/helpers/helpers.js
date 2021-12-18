import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { wrapIn } from 'prosemirror-commands';
import {
  joinPoint,
  canJoin,
  findWrapping,
  liftTarget,
  canSplit,
  ReplaceAroundStep,
} from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';

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

const createOptions = (
  main,
  context,
  parentType,
  questionType,
  answerTtype,
) => {
  checkifEmpty(main);
  const { state, dispatch } = main;
  /* Create Wrapping */
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);
  const { tr } = main.state;

  const wrapping = range && findWrapping(range, parentType, { id: uuidv4 });
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
  const firstOption = answerTtype.create({ id: uuidv4() }, Fragment.empty);

  /* create Second Option */
  const secondOption = answerTtype.create({ id: uuidv4() }, Fragment.empty);
  tr.replaceSelectionWith(question);
  tr.replaceSelectionWith(firstOption);
  tr.setSelection(TextSelection.create(tr.doc, newPos + 1));
  tr.replaceSelectionWith(secondOption);
  dispatch(tr);

  setTimeout(() => {
    createEmptyParagraph(context, secondOption.attrs.id);
    createEmptyParagraph(context, firstOption.attrs.id);
  }, 50);
};

export default {
  createEmptyParagraph,
  checkifEmpty,
  createOptions,
};
