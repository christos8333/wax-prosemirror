import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { v4 as uuidv4 } from 'uuid';
import Tools from '../lib/Tools';

@injectable()
class FillTheGapQuestion extends Tools {
  title = 'Add Fill The Gap Question';
  icon = 'gapQuestion';
  name = 'Fill The Gap';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.fill_the_gap_container, {
        id: uuidv4(),
      })(state, dispatch);
    };
  }

  get active() {
    return state => {};
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

  get enable() {
    return state => {};
  }
}

export default FillTheGapQuestion;
