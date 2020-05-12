import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
class ExtractProse extends Tools {
  title = "Change to Extract Prose";
  content = "Extract Prose";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractProse)(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.extractProse)(
        state
      );
    };
  }
}
export default ExtractProse;
