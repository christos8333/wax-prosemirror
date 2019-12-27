import { undo } from "prosemirror-history";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Undo extends Tools {
  title = "Undo last change";
  content = icons.undo;

  get run() {
    return undo;
  }

  get enable() {
    return undo;
  }
}
