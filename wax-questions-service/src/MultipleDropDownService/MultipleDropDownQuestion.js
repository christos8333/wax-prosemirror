import { injectable } from 'inversify';
import { findWrapping } from 'prosemirror-transform';
import { v4 as uuidv4 } from 'uuid';
import { Tools, Commands } from 'wax-prosemirror-core';
import helpers from '../MultipleChoiceQuestionService/helpers/helpers';

@injectable()
class MultipleDropDownQuestion extends Tools {
  title = 'Add Multiple Drop Down Question';
  icon = 'mulitpleDropDownQuestion';
  name = 'Multiple Drop Down';

  get run() {
    return main => {
      const { dispatch } = main;
      const { state } = main;
      helpers.checkifEmpty(main);
      const { $from, $to } = main.state.selection;
      const range = $from.blockRange($to);
      const { tr } = main.state;

      const wrapping =
        range &&
        findWrapping(
          range,
          state.config.schema.nodes.multiple_drop_down_container,
          {
            id: uuidv4(),
          },
        );
      if (!wrapping) return false;
      tr.wrap(range, wrapping);
      dispatch(tr);
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.multiple_drop_down_container,
        )
      ) {
        return true;
      }
      return false;
    };
  }

  select = (state, activeViewId, activeView) => {
    const { disallowedTools } = activeView.props;
    let status = true;
    const { from, to } = state.selection;
    if (from === null || disallowedTools.includes('MultipleDropDown'))
      return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {};
  }
}

export default MultipleDropDownQuestion;
