import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { setBlockType } from "prosemirror-commands";

@injectable()
export default class EpigraphyPoetry extends Tools {
  title = "Change to Epigraph Poetry";
  content = "Epigraph Poetry";

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.epigraphyPoetry)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.epigraphyPoetry)(state);
    };
  }
}
