import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Heading3 extends Tools {
  title = "Change to heading level 3";
  content = "Heading 3";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.heading, { level: 3 })(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 3,
        track: []
      })(state);
    };
  }
}
