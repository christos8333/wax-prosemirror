import Service from "../Service";
import ListsServices from "./index";

class ListsService extends Service {
  dependencies = ListsServices;
}

export default ListsService;
