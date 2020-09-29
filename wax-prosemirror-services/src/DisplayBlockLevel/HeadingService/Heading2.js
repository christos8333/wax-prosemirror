import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class Heading2 extends Tools {
  title = 'Change to heading level 2';
  label = 'Heading 2';
  name = 'Heading2';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading, { level: 2 })(
        state,
        dispatch,
      );
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.heading, {
        level: 2,
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
        level: 2,
      })(state);
    };
  }
}
