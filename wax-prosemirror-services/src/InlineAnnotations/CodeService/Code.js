import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Code extends Tools {
  title = 'Toggle code';
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
