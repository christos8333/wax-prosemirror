import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Author extends Tools {
  title = "Change to Author";
  content = "Author";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.author)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.author)(state);
    };
  }
}
