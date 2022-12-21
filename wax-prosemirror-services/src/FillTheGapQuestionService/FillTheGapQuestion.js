import { injectable } from 'inversify';
import { findWrapping } from 'prosemirror-transform';
import { v4 as uuidv4 } from 'uuid';
import { Commands, Tools } from 'wax-prosemirror-core';
import helpers from '../MultipleChoiceQuestionService/helpers/helpers';

@injectable()
class FillTheGapQuestion extends Tools {
  title = 'Add Fill The Gap Question';
  icon = 'gapQuestion';
  name = 'Fill The Gap';

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
        findWrapping(range, state.config.schema.nodes.fill_the_gap_container, {
          id: uuidv4(),
        });
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
          state.config.schema.nodes.fill_the_gap_container,
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
    if (from === null || disallowedTools.includes('FillTheGap')) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };
}

export default FillTheGapQuestion;
