import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { findWrapping } from 'prosemirror-transform';
import { TextSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-utilities';

import { v4 as uuidv4 } from 'uuid';
import Tools from '../lib/Tools';

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

@injectable()
class MatchingQuestion extends Tools {
  title = 'Add Matching';
  label = 'Matching';
  name = 'Matching';

  get run() {
    return (state, dispatch, view) => {
      checkifEmpty(view);
      /* Create Wrapping */
      const { $from, $to } = view.state.selection;
      const range = $from.blockRange($to);
      const { tr } = view.state;

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
        { id: uuidv4() },
        Fragment.empty,
      );

      tr.replaceSelectionWith(option);
      dispatch(tr);
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

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}
export default MatchingQuestion;
