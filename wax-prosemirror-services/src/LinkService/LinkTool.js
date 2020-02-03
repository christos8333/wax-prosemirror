import { toggleMark } from "prosemirror-commands";
import { markActive } from "../lib/Utils";
import Tools from "../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class LinkTool extends Tools {
  title = "Add or remove link";
  content = icons.link;

  get run() {
    return (state, dispatch) => {
      if (markActive(state.config.schema.marks.link)(state)) {
        toggleMark(state.config.schema.marks.link)(state, dispatch);
        return true;
      }
      const { selection: { $from, $to } } = state;
      dispatch(
        state.tr
          .setMeta("addToHistory", false)
          .addMark(
            $from.pos,
            $to.pos,
            state.schema.marks.link.create({ href: "" })
          )
      );
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
