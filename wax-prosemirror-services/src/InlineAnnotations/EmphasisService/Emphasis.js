import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

@injectable()
export default class Emphasis extends Tools {
  title = 'Toggle emphasis';
  icon = 'italic';
  name = 'Emphasis';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.em)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.em)(state);
    };
  }
}
