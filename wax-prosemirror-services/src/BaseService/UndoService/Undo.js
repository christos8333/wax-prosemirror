import { undo } from "prosemirror-history";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Undo extends Tools {
  title = "Undo last change";
  content = icons.undo;
  onlyOnMain = true;

  get run() {
    return (state, dispatch) => {
      const { tr } = state;
      undo(state, tr => dispatch(tr.setMeta("inputType", "historyUndo")));
    };
  }

  get enable() {
    return undo;
  }
}
