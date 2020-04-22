import { Service } from "wax-prosemirror-core";
import ListsServices from "./index";

class ListsService extends Service {
  dependencies = ListsServices;
}

export default ListsService;
