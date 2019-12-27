import Service from "wax-prosemirror-core/src/services/Service";
import EpigraphProse from "./EpigraphProse";

class EpigraphProseService extends Service {
  boot() {}

  register() {
    this.container.bind("EpigraphProse").to(EpigraphProse);
  }
}

export default EpigraphProseService;
