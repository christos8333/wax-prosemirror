import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { v4 as uuidv4 } from 'uuid';
import Tools from '../lib/Tools';

@injectable()
class EssayQuestion extends Tools {
  title = 'Add Essay Question';
  icon = '';
  name = 'Essay';
  label = 'Essay';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.essay, {
        id: uuidv4(),
      })(state, dispatch);
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeView) => {
    let status = true;
    const { from, to } = state.selection;

    if (from === null) return false;

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

export default EssayQuestion;
