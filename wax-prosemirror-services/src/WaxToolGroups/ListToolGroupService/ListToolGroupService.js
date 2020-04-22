import Service from "../../Service";
import Lists from "./Lists";

class ListToolGroupService extends Service {
  name = "ListToolGroupService";

  register() {
    this.container.bind("Lists").to(Lists);
  }
}

export default ListToolGroupService;
