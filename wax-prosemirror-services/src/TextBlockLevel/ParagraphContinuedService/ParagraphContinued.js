import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
class ParagraphContinued extends Tools {
  title = "Change to Paragraph Continued";
  content = "Paragraph Continued";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.paragraphCont)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.paragraphCont)(state);
    };
  }
}

export default ParagraphContinued;
