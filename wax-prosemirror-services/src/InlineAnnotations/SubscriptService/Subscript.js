import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

@injectable()
export default class Subscript extends Tools {
  title = 'Toggle subscript';
  icon = 'subscript';
  name = 'Subscript';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.subscript)(state, dispatch);
    };
  }

  select = state => {
    const {
      selection: { from },
    } = state;
    if (from === null) return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.subscript)(state);
    };
  }
}
