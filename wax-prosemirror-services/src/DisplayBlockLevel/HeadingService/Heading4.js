import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class Heading4 extends Tools {
  title = 'Change to heading level 4';
  label = 'Heading 4';
  name = 'Heading4';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading, { level: 4 })(
        state,
        dispatch,
      );
    };
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = true;
      if (activeViewId !== 'main') return false;
      const { from, to } = state.selection;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'list_item') {
          isActive = false;
        }
      });
      if (!isActive) return false;
      return !Commands.setBlockType(state.config.schema.nodes.heading, {
        level: 4,
      })(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.heading, {
        level: 4,
      })(state);
    };
  }
}
