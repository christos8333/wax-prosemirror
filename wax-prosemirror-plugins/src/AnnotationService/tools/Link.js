import { toggleMark } from "prosemirror-commands";
import { markActive, promptForURL } from "../../lib/Utils";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Link extends Tools {
  title = "Add or remove link";
  content = icons.link;

  get run() {
    return (state, dispatch) => {
      if (markActive(state.config.schema.marks.link)(state)) {
        toggleMark(state.config.schema.marks.link)(state, dispatch);
        return true;
      }

      const href = promptForURL();
      if (!href) return false;

      toggleMark(state.config.schema.marks.link, { href })(state, dispatch);
    };
  }

  get enable() {
    return state => !state.selection.empty;
  }

  get active() {
    return state => {
      return markActive(state.config.schema.marks.link)(state);
    };
  }
}
