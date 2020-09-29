import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class Author extends Tools {
  title = 'Change to Author';
  label = 'Author';
  name = 'Author';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.author, {
        class: 'author',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.author)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.author)(state);
    };
  }
}

export default Author;
