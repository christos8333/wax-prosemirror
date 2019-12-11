import { lift } from "prosemirror-commands";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Lift extends Tools {
  title = "Lift out of enclosing block";
  content = icons.lift;

  get run() {
    return lift;
  }

  get enable() {
    return lift;
  }
}
