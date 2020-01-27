import Service from "wax-prosemirror-core/src/services/Service";
import Lift from "./Lift";

class LiftService extends Service {
  boot() {}

  register() {
    this.container.bind("Lift").to(Lift);
  }
}

export default LiftService;
