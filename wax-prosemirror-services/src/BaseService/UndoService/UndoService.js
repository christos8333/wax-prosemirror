import Service from "wax-prosemirror-core/src/services/Service";
import Undo from "./Undo";

class UndoService extends Service {
  boot() {}

  register() {
    this.container.bind("Undo").to(Undo);
  }
}

export default UndoService;
