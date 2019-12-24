import TablesServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class TablesService extends Service {
  register() {
    this.config.pushToArray("services", TablesServices);
  }
}

export default TablesService;
