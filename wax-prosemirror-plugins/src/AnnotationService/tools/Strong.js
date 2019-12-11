import { toggleMark } from "prosemirror-commands";
import { markActive } from "../../lib/Utils";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Strong extends Tools {
  title = "Toggle strong";
  content = icons.strong;

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strong)(state, dispatch);
    };
  }

  get active() {
    return state => {
      console.log(state, "dddd");
      return markActive(state.config.schema.marks.strong)(state);
    };
  }
}
