import Service from "wax-prosemirror-core/src/services/Service";
import EpigraphPoetry from "./EpigraphPoetry";

class EpigraphPoetryService extends Service {
  boot() {}

  register() {
    this.container.bind("EpigraphPoetry").to(EpigraphPoetry);
  }
}

export default EpigraphPoetryService;
