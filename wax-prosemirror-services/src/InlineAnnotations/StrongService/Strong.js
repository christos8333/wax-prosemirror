import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';
import { injectable } from 'inversify';

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

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.strong)(state);
    };
  }
}
