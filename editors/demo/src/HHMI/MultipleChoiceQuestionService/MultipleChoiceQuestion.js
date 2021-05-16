import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {
    return (state, dispatch) => {
      const { tr } = state;

      const attrs = {
        class: 'question',
      };

      const { from, to } = state.selection;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          !node.isTextblock ||
          node.hasMarkup(state.config.schema.nodes.question_wrapper, attrs)
        ) {
          return;
        }
        let applicable = false;
        if (node.type === state.config.schema.nodes.question_wrapper) {
          applicable = true;
        } else {
          const $pos = state.doc.resolve(pos);
          const index = $pos.index();
          applicable = $pos.parent.canReplaceWith(
            index,
            index + 1,
            state.config.schema.nodes.question_wrapper,
          );
        }
        if (applicable) {
          tr.setBlockType(
            from,
            to,
            state.config.schema.nodes.question_wrapper,
            {
              ...node.attrs,
              ...attrs,
            },
          );
        }
      });
      if (!tr.steps.length) return false;
      const { empty, $from, $to } = state.selection;
      let content = Fragment.empty;
      if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
        content = $from.parent.content.cut(
          $from.parentOffset,
          $to.parentOffset,
        );

      const footnote = state.config.schema.nodes.multiple_choice.create(
        { id: uuidv4() },
        content,
      );
      dispatch(tr.replaceSelectionWith(footnote));
      // dispatch(state.tr.replaceSelectionWith(footnote));
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {};
  }
}

export default MultipleChoiceQuestion;
