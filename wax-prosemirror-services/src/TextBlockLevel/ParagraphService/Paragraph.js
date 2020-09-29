import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

export default
@injectable()
class Paragraph extends Tools {
  title = 'Change to Paragraph';
  label = 'Paragraph';
  name = 'Paragraph';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.paragraph, {
        class: 'paragraph',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.paragraph)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.paragraph)(state);
    };
  }
}
