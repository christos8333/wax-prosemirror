import Service from "wax-prosemirror-core/src/services/Service";
import { emphasisMark } from "wax-prosemirror-schema";
import Emphasis from "./Emphasis";

class EmphasisService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");

    createMark({ em: emphasisMark });
  }

  register() {
    this.container.bind("Emphasis").to(Emphasis);
  }
}

export default EmphasisService;
