import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Strong extends Tools {
  title = 'Toggle strong';
  icon = 'bold';
  name = 'Strong';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strong)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.strong)(state);
    };
  }
}
