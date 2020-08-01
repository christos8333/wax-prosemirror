import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';

export default
@injectable()
class Code extends Tools {
  title = 'Toggle code';
  content = icons.code;

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
