import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

export default
@injectable()
class Title extends Tools {
  title = 'Change to Title';
  label = 'Title';
  name = 'Title';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.title, {
        class: 'title',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.title)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.title)(state);
    };
  }
}
