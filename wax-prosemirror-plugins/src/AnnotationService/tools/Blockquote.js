import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";
import { wrapIn } from "prosemirror-commands";
import { blockActive } from "../../lib/Utils";

@injectable()
export default class Blockquote extends Tools {
  title = "Wrap in block quote";
  content = icons.blockquote;

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return wrapIn(state.config.schema.nodes.blockquote)(state);
    };
  }

  get active() {
    return state => {
      return blockActive(state.config.schema.nodes.blockquote)(state);
    };
  }
}
