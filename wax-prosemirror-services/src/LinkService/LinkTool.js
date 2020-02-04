import { toggleMark } from "prosemirror-commands";
import { Commands } from "wax-prosemirror-utilities";
import Tools from "../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class LinkTool extends Tools {
  title = "Add or remove link";
  content = icons.link;

  get run() {
    return (state, dispatch) => {
      if (Commands.markActive(state.config.schema.marks.link)(state)) {
        toggleMark(state.config.schema.marks.link)(state, dispatch);
        return true;
      }
      //TODO disable creating multiblock links
      Commands.createLink(state, dispatch);
    };
  }

  get enable() {
    return state => !state.selection.empty;
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.link)(state);
    };
  }
}
