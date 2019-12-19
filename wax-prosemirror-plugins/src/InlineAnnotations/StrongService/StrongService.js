import Service from "wax-prosemirror-core/src/services/Service";
import { strongMark } from "wax-prosemirror-schema";
import Strong from "./Strong";

class StrongService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");

    createMark({ strong: strongMark });
  }

  register() {
    this.container.bind("Strong").to(Strong);
  }
}

export default StrongService;
