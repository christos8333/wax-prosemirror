import TextServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class TextBlockLevelService extends Service {
  register() {
    this.config.pushToArray("services", TextServices);
  }
}

export default TextBlockLevelService;
