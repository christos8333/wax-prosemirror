import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { Commands } from "wax-prosemirror-utilities";

@injectable()
class ParagraphContinued extends Tools {
  title = "Change to Paragraph Continued";
  content = "Paragraph Continued";

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.paragraphCont, {
        class: "paragraph-cont"
      })(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.paragraphCont)(
        state
      );
    };
  }
}

export default ParagraphContinued;
