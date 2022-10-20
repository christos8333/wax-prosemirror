import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';

@injectable()
export default class SmallCaps extends Tools {
  title = 'Toggle Small Caps';
  icon = 'smallCaps';
  name = 'SmallCaps';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.smallcaps)(state, dispatch);
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
      return Commands.markActive(state.config.schema.marks.smallcaps)(state);
    };
  }
}
