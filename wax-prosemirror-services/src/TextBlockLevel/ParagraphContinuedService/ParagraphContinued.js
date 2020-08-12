import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class ParagraphContinued extends Tools {
  title = 'Change to Paragraph Continued';
  content = 'Paragraph Continued';
  name = 'ParagraphContinued';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.paragraphCont, {
        class: 'paragraph-cont',
      })(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.paragraphCont)(
        state,
      );
    };
  }
}

export default ParagraphContinued;
