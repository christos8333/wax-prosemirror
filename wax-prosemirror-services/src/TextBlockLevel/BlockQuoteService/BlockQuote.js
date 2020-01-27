import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { wrapIn } from "prosemirror-commands";

@injectable()
class BlockQuote extends Tools {
  title = "Change to Block Quote";
  content = "Block Quote";

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      console.log(state);
      return wrapIn(state.config.schema.nodes.blockquote)(state);
    };
  }
}
export default BlockQuote;
