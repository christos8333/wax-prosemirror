import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class EpigraphProse extends Tools {
  title = "Change to Epigraph Prose";
  content = "Epigraph Prose";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.epigraphProse)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.epigraphProse)(state);
    };
  }
}
