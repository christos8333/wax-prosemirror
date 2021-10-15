import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class StrikeThrough extends Tools {
  title = 'Toggle strikethrough';
  icon = 'strikethrough';
  name = 'StrikeThrough';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.strikethrough)(
        state,
      );
    };
  }
}
