import Service from "../../Service";
import Save from "./Save";

class SaveService extends Service {
  boot() {}

  register() {
    this.container.bind("Save").to(Save);
  }
}

export default SaveService;
