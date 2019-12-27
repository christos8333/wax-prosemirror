import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Save extends Tools {
  title = "Save changes";
  content = icons.save;

  get run() {}

  get enable() {}
}
