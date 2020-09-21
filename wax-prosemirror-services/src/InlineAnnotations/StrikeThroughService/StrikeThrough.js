import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class StrikeThrough extends Tools {
  title = 'Toggle strikethrough';
  // content = icons.strikethrough;
  icon = 'strikethrough';
  name = 'StrikeThrough';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.strikethrough)(
        state,
      );
    };
  }
}
