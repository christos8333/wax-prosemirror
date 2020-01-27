import Service from "wax-prosemirror-core/src/services/Service";
import Save from "./Save";

class SaveService extends Service {
  boot() {}

  register() {
    this.container.bind("Save").to(Save);
  }
}

export default SaveService;
