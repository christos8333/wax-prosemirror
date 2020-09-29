import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class SubTitle extends Tools {
  title = 'Change to Subtitle';
  label = 'Subtitle';
  name = 'SubTitle';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.subtitle, {
        class: 'cst',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.subtitle)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.subtitle)(state);
    };
  }
}
