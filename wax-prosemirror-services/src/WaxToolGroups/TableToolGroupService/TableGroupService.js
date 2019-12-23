import Table from "./Table";
import Service from "wax-prosemirror-core/src/services/Service";

class TableToolGroupService extends Service {
  name = "TableToolGroupService";

  register() {
    this.container.bind("Table").to(Table);
  }
}

export default TableToolGroupService;
