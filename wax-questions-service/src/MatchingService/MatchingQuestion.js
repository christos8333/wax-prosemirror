import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { findWrapping } from 'prosemirror-transform';
import { TextSelection } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';
import { Tools, Commands } from 'wax-prosemirror-core';
import helpers from '../MultipleChoiceQuestionService/helpers/helpers';

@injectable()
class MatchingQuestion extends Tools {
  title = 'Add Matching';
  label = 'Matching';
  name = 'Matching';

  get run() {
    return main => {
      const { dispatch } = main;
      const { state } = main;
      helpers.checkifEmpty(main);
      /* Create Wrapping */
      const { $from, $to } = main.state.selection;
      const range = $from.blockRange($to);
      const { tr } = main.state;

      const wrapping =
        range &&
        findWrapping(range, state.config.schema.nodes.matching_container, {
          id: uuidv4(),
        });
      if (!wrapping) return false;
      tr.wrap(range, wrapping);

      const map = tr.mapping.maps[0];
      let newPos = 0;
      map.forEach((_from, _to, _newFrom, newTo) => {
        newPos = newTo;
      });

      tr.setSelection(TextSelection.create(tr.doc, range.$to.pos));
      const option = state.config.schema.nodes.matching_option.create(
        { id: uuidv4(), isfirst: true },
        Fragment.empty,
      );

      tr.replaceSelectionWith(option);
      dispatch(tr);
      return true;
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.matching_container,
        ) ||
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.matching_option,
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
    if (from === null || disallowedTools.includes('Matching')) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };
}
export default MatchingQuestion;
