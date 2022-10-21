import { injectable } from 'inversify';
import { toggleMark } from 'prosemirror-commands';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class LinkTool extends Tools {
  title = 'Add or remove link';
  icon = 'link';
  name = 'LinkTool';

  get run() {
    return (state, dispatch) => {
      if (Commands.markActive(state.config.schema.marks.link)(state)) {
        toggleMark(state.config.schema.marks.link)(state, dispatch);
        return true;
      }
      Commands.createLink(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.isOnSameTextBlock(state);
    };
  }

  select = state => {
    return Commands.isOnSameTextBlock(state);
  };

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.link)(state);
    };
  }
}
