import Service from "wax-prosemirror-core/src/services/Service";
import Title from "./Title";

class TitleService extends Service {
  boot() {}

  register() {
    this.container.bind("Title").to(Title);
  }
}

export default TitleService;
