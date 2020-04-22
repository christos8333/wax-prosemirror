import { Service } from "wax-prosemirror-core";
import Display from "./Display";

class DisplayToolGroupService extends Service {
  name = "DisplayToolGroupService";

  register() {
    this.container.bind("Display").to(Display);
  }
}

export default DisplayToolGroupService;
