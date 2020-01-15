import Service from "wax-prosemirror-core/src/services/Service";
import ParagraphContinued from "./ParagraphContinued";

class ParagraphContinuedService extends Service {
  boot() {}

  register() {
    this.container.bind("ParagraphContinued").to(ParagraphContinued);
  }
}

export default ParagraphContinuedService;
