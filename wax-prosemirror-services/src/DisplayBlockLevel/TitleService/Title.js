import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
export default class Title extends Tools {
  title = 'Change to Title';
  content = 'Title';
  name = 'Title';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.title, {
        class: 'title',
      })(state, dispatch);
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
