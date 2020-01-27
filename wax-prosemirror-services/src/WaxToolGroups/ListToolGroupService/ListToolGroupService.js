import Lists from "./Lists";
import Service from "wax-prosemirror-core/src/services/Service";

class ListToolGroupService extends Service {
  name = "ListToolGroupService";

  register() {
    this.container.bind("Lists").to(Lists);
  }
}

export default ListToolGroupService;
