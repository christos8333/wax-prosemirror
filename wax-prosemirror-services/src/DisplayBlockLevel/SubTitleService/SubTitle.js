import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class SubTitle extends Tools {
  title = "Change to Subtitle";
  content = "Subtitle";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.subtitle)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.subtitle)(state);
    };
  }
}
