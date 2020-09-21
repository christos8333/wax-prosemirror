import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
// import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Code extends Tools {
  title = 'Toggle code';
  // content = icons.code;
  icon = 'code';
  name = 'Code';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.code)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.code)(state);
    };
  }
}
