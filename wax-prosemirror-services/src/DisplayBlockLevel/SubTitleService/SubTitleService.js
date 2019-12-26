import Service from "wax-prosemirror-core/src/services/Service";
import SubTitle from "./SubTitle";

class SubTitleService extends Service {
  boot() {}

  register() {
    this.container.bind("SubTitle").to(SubTitle);
  }
}

export default SubTitleService;
