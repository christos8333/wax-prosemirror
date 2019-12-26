import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Heading2 extends Tools {
  title = "Change to heading level 2";
  content = "Heading 2";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.heading, { level: 2 })(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 2,
        track: []
      })(state);
    };
  }
}
