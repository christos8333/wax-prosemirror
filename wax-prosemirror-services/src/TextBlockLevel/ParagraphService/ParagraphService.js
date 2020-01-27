import Service from "wax-prosemirror-core/src/services/Service";
import Paragraph from "./Paragraph";

class ParagraphService extends Service {
  boot() {}

  register() {
    this.container.bind("Paragraph").to(Paragraph);
  }
}

export default ParagraphService;
