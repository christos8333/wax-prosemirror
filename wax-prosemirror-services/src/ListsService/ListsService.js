import ListsServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class ListsService extends Service {
  dependencies = ListsServices;
}

export default ListsService;
