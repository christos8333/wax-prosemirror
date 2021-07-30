import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Fragment } from 'prosemirror-model';

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

    let type = context.view.main.state.schema.nodes.paragraph;
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
};

export default {
  createEmptyParagraph,
};
