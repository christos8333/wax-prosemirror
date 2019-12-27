import { tableNodes } from "prosemirror-tables";
import Service from "wax-prosemirror-core/src/services/Service";
import Table from "./Table";

class InsertTableService extends Service {
  boot() {}

  register() {
    this.container.bind("Table").to(Table);
  }
}

export default InsertTableService;
