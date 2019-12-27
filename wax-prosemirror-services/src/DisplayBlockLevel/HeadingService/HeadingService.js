import Service from "wax-prosemirror-core/src/services/Service";
import Heading1 from "./Heading1";
import Heading2 from "./Heading3";
import Heading3 from "./Heading3";

class HeadingService extends Service {
  boot() {}

  register() {
    this.container.bind("Heading1").to(Heading1);
    this.container.bind("Heading2").to(Heading2);
    this.container.bind("Heading3").to(Heading3);
  }
}

export default HeadingService;
