import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
class ExtractProse extends Tools {
  title = "Change to Extract Prose";
  content = "Extract Prose";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.extractProse)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.extractProse)(state);
    };
  }
}
export default ExtractProse;
