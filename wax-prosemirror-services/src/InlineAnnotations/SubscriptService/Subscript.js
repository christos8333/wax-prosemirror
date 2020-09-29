import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Subscript extends Tools {
  title = 'Toggle subscript';
  icon = 'subscript';
  name = 'Subscript';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.subscript)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.subscript)(state);
    };
  }
}
