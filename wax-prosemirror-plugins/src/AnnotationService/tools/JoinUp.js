import { joinUp } from "prosemirror-commands";
import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class JoinUp extends Tools {
  title = "Join with above block";
  content = icons.join_up;

  get run() {
    return joinUp;
  }

  get enable() {
    return joinUp;
  }

  select(state) {
    return joinUp(state);
  }
}
