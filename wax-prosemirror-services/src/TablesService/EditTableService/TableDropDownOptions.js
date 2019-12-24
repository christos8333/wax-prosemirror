import React from "react";
import { v4 as uuid } from "uuid";
import { canInsert } from "../../../lib/Utils";
import Tools from "../../../lib/Tools";
import { injectable } from "inversify";
import { TableDropDown } from "wax-prosemirror-components";
import { addColumnBefore } from "prosemirror-tables";

@injectable()
export default class TableDropDownOptions extends Tools {
  title = "Select Options";
  content = "table";

  get run() {
    return () => {
      return true;
    };
  }

  get enable() {
    return state => {
      return canInsert(state.config.schema.nodes.table)(state);
    };
  }

  select(state) {
    return addColumnBefore(state);
  }

  renderTool(view) {
    return this._isEnabled ? (
      <TableDropDown key={uuid()} item={this.toJSON()} {...view} />
    ) : null;
  }
}
