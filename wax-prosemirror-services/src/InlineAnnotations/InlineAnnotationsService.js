import InlineServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class InlineAnnotationsService extends Service {
  register() {
    this.config.pushToArray("services", InlineServices);
  }
}

export default InlineAnnotationsService;
