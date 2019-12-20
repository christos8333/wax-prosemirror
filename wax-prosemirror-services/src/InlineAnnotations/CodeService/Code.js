import { toggleMark } from "prosemirror-commands";
import { markActive } from "../../lib/Utils";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Code extends Tools {
  title = "Toggle code";
  content = icons.code;

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.code)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return markActive(state.config.schema.marks.code)(state);
    };
  }
}
