import Display from "./Display";
import Service from "wax-prosemirror-core/src/services/Service";

class DisplayToolGroupService extends Service {
  name = "DisplayToolGroupService";

  register() {
    this.container.bind("Display").to(Display);
  }
}

export default DisplayToolGroupService;
