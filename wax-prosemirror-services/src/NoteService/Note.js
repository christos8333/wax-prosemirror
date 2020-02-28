import Tools from "../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";
import { Fragment } from "prosemirror-model";

@injectable()
export default class Note extends Tools {
  title = "Insert Note";
  content = icons.footnote;

  get run() {
    return (state, dispatch) => {
      let { empty, $from, $to } = state.selection,
        content = Fragment.empty;
      if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
        content = $from.parent.content.cut(
          $from.parentOffset,
          $to.parentOffset
        );
      const footnote = state.config.schema.nodes.footnote.create(null, content);
      dispatch(state.tr.replaceSelectionWith(footnote));
    };
  }

  get enable() {}
}
