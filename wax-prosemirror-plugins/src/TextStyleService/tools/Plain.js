import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Plain extends Tools {
  title = "Change to General Text";
  content = "General Text";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.paragraph)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.paragraph)(state);
    };
  }
}
