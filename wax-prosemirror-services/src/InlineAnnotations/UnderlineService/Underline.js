import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Underline extends Tools {
  title = 'Toggle underline';
  content = icons.underline;
  name = 'Underline';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.underline)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.underline)(state);
    };
  }
}
