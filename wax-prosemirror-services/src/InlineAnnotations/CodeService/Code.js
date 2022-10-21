import { toggleMark } from 'prosemirror-commands';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class Code extends Tools {
  title = 'Toggle code';
  icon = 'code';
  name = 'Code';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.code)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.code)(state);
    };
  }
}
