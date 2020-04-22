import { Service } from "wax-prosemirror-core";
import TablesServices from "./index";

class TablesService extends Service {
  dependencies = TablesServices;
}

export default TablesService;
