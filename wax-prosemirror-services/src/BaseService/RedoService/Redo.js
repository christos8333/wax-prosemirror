import { redo } from "prosemirror-history";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Redo extends Tools {
  title = "Redo last undone change";
  content = icons.redo;
  onlyOnMain = true;

  get run() {
    return redo;
  }

  get enable() {
    return redo;
  }
}
