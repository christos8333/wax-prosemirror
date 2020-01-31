import TablesServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class TablesService extends Service {
  dependencies = TablesServices;
}

export default TablesService;
