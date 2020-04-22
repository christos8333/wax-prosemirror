import { Service } from "wax-prosemirror-core";
import { tableNodes, goToNextCell } from "prosemirror-tables";
import Table from "./Table";

class InsertTableService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({
      Tab: goToNextCell(1),
      "Shift-Tab": goToNextCell(-1)
    });
  }

  register() {
    this.container.bind("Table").to(Table);

    const { table, table_row, table_cell, table_header } = tableNodes({
      tableGroup: "block",
      cellContent: "block+"
    });
    const createNode = this.container.get("CreateNode");

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
