import ListsServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class ListsService extends Service {
  register() {
    this.config.pushToArray("services", ListsServices);
  }
}

export default ListsService;
