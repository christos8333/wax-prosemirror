import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Title extends Tools {
  title = "Change to Title";
  content = "Title";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.title)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.title)(state);
    };
  }
}
