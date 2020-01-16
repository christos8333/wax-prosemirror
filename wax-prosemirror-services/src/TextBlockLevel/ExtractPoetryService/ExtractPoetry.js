import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
class ExtractPoetry extends Tools {
  title = "Change to Extract Poetry";
  content = "Extract Poetry";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.extractPoetry)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.extractPoetry)(state);
    };
  }
}
export default ExtractPoetry;
