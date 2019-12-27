import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class Heading1 extends Tools {
  title = "Change to heading level 1";
  content = "Heading 1";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.heading, { level: 1 })(
        state,
        dispatch
      );
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 1,
        track: []
      })(state);
    };
  }
}
