import BaseServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class BaseService extends Service {
  register() {
    this.config.pushToArray("services", BaseServices);
  }
}

export default BaseService;
