import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
export default class SubTitle extends Tools {
  title = 'Change to Subtitle';
  content = 'Subtitle';
  name = 'SubTitle';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.subtitle, {
        class: 'cst',
      })(state, dispatch);
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
