import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';

@injectable()
export default class Underline extends Tools {
  title = 'Toggle underline';
  // content = icons.underline;
  icon = 'underline';
  name = 'Underline';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.underline)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.underline)(state);
    };
  }
}
