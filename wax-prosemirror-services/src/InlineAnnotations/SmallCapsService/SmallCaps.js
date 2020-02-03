import { toggleMark } from "prosemirror-commands";
import { Commands } from "wax-prosemirror-utilities";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class SmallCaps extends Tools {
  title = "Toggle Small Caps";
  content = icons.small_caps;

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.smallcaps)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.smallcaps)(state);
    };
  }
}
