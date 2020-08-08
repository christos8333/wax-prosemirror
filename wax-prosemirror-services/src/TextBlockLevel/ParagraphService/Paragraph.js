import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
export default class Paragraph extends Tools {
  title = 'Change to Paragraph';
  content = 'Paragraph';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.paragraph, {
        class: 'paragraph',
      })(state, dispatch);
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
