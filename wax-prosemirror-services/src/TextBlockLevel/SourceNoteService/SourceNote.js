import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
class SourceNote extends Tools {
  title = "Change to Source Note";
  content = "Source Note";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.sourceNote)(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.sourceNote)(state);
    };
  }
}
export default SourceNote;
