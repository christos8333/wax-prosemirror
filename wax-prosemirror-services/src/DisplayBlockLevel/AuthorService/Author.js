import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
export default class Author extends Tools {
  title = "Change to Author";
  content = "Author";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.author)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.author)(state);
    };
  }
}
