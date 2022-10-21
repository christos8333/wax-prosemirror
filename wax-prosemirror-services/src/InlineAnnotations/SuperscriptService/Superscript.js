import { toggleMark } from 'prosemirror-commands';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class Superscript extends Tools {
  title = 'Toggle superscript';
  icon = 'superscript';
  name = 'Superscript';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.superscript)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.superscript)(state);
    };
  }
}
