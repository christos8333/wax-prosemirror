import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
class ExtractPoetry extends Tools {
  title = "Change to Extract Poetry";
  content = "Extract Poetry";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractPoetry)(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.extractPoetry)(
        state
      );
    };
  }
}
export default ExtractPoetry;
