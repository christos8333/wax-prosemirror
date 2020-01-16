import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
class SourceNote extends Tools {
  title = "Change to Source Note";
  content = "Source Note";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.sourceNote)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.sourceNote)(state);
    };
  }
}
export default SourceNote;
