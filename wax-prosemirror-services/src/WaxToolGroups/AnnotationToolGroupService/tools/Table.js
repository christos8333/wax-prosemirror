import Tools from "../../../lib/Tools";
import { createTable, canInsert } from "../../../lib/Utils";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";

@injectable()
export default class Table extends Tools {
  title = "Insert table";
  content = icons.table;

  get run() {
    return (state, dispatch) => {
      return createTable(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return canInsert(state.config.schema.nodes.table)(state);
    };
  }
}
