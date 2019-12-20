import { toggleMark } from "prosemirror-commands";
import { markActive } from "../../lib/Utils";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Superscript extends Tools {
  title = "Toggle superscript";
  content = icons.superscript;

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.superscript)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return markActive(state.config.schema.marks.superscript)(state);
    };
  }
}
