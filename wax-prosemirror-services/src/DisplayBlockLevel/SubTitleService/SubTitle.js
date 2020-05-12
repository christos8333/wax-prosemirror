import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
export default class SubTitle extends Tools {
  title = "Change to Subtitle";
  content = "Subtitle";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.subtitle, {
        class: "cst"
      })(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.subtitle)(state);
    };
  }
}
