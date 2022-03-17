import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { v4 as uuidv4 } from 'uuid';
import Tools from '../lib/Tools';

@injectable()
class MatchingQuestion extends Tools {
  title = 'Add Matching';
  label = 'Matching';
  name = 'Matching';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.matching_container, {
        id: uuidv4(),
      })(state, dispatch);
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
