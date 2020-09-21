import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
// import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Emphasis extends Tools {
  title = 'Toggle emphasis';
  // content = icons.em;
  icon = 'italic';
  name = 'Emphasis';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.em)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.em)(state);
    };
  }
}
