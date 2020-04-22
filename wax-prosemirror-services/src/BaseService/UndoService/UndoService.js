import Service from "../../Service";
import Undo from "./Undo";

class UndoService extends Service {
  boot() {}

  register() {
    this.container.bind("Undo").to(Undo);
  }
}

export default UndoService;
