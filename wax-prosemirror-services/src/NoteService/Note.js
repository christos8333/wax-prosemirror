import Tools from "../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Note extends Tools {
  title = "Insert Note";
  content = icons.footnote;

  get run() {
    return (state, dispatch) => {
      const footnote = state.config.schema.nodes.footnote.create();
      dispatch(state.tr.replaceSelectionWith(footnote));
    };
  }

  get enable() {}
}
