import DisplayServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class DisplayBlockLevelService extends Service {
  register() {
    this.config.pushToArray("services", DisplayServices);
  }
}

export default DisplayBlockLevelService;
