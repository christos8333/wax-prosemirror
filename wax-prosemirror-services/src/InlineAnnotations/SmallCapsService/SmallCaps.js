import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class SmallCaps extends Tools {
  title = 'Toggle Small Caps';
  icon = 'smallCaps';
  name = 'SmallCaps';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.smallcaps)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.smallcaps)(state);
    };
  }
}
