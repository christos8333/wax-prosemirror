import Service from "../../Service";
import Paragraph from "./Paragraph";

class ParagraphService extends Service {
  boot() {}

  register() {
    this.container.bind("Paragraph").to(Paragraph);
  }
}

export default ParagraphService;
