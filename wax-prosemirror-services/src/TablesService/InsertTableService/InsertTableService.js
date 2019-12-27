import { tableNodes } from "prosemirror-tables";
import Service from "wax-prosemirror-core/src/services/Service";
import Table from "./Table";

class InsertTableService extends Service {
  boot() {}

  register() {
    this.container.bind("Table").to(Table);

    const createNode = this.container.get("CreateNode");
    const { table, table_row, table_cell, table_header } = tableNodes({
      tableGroup: "block",
      cellContent: "block+"
    });

    createNode({
      table
    });
    createNode({
      table_row
    });
    createNode({
      table_cell
    });
    createNode({
      table_header
    });
  }
}

export default InsertTableService;
