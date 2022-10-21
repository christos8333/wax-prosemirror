import { toggleMark } from 'prosemirror-commands';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class StrikeThrough extends Tools {
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
