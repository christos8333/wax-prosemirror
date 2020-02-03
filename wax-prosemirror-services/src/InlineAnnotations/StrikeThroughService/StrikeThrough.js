import { toggleMark } from "prosemirror-commands";
import { Commands } from "wax-prosemirror-utilities";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class StrikeThrough extends Tools {
  title = "Toggle strikethrough";
  content = icons.strikethrough;

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.strikethrough)(
        state
      );
    };
  }
}
