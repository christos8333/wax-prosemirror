import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Superscript extends Tools {
  title = 'Toggle superscript';
  icon = 'superscript';
  name = 'Superscript';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.superscript)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.superscript)(state);
    };
  }
}
