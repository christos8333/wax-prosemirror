import Tables from "./Tables";
import Service from "wax-prosemirror-core/src/services/Service";

class TableToolGroupService extends Service {
  name = "TableToolGroupService";

  register() {
    this.container.bind("Tables").to(Tables);
  }
}

export default TableToolGroupService;
