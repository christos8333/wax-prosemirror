import { toggleMark } from 'prosemirror-commands';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class Strong extends Tools {
  title = 'Toggle strong';
  icon = 'bold';
  name = 'Strong';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strong)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.strong)(state);
    };
  }
}
