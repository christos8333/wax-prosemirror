import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { wrapIn } from 'prosemirror-commands';

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

const createOptions = (main, context, type) => {
  checkifEmpty(main);
  const { state, dispatch } = main;
  /* Create Wrapping */
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);

  wrapIn(state.config.schema.nodes.multiple_choice_container, {
    id: uuidv4(),
  })(state, dispatch);

  /* set New Selection */
  dispatch(
    main.state.tr.setSelection(
      new TextSelection(main.state.tr.doc.resolve(range.$to.pos)),
    ),
  );

  /* create First Option */
  const firstOption = type.create({ id: uuidv4() }, Fragment.empty);
  dispatch(main.state.tr.replaceSelectionWith(firstOption));

  /* create Second Option */
  const secondOption = type.create({ id: uuidv4() }, Fragment.empty);
  dispatch(main.state.tr.replaceSelectionWith(secondOption));

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
