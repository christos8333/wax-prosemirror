import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
export default class Title extends Tools {
  title = "Change to Title";
  content = "Title";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.title)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.title)(state);
    };
  }
}
