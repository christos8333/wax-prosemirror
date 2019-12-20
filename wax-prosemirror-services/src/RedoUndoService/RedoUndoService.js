import RedoUndo from "./RedoUndo";
import Service from "wax-prosemirror-core/src/services/Service";
import Redo from "./Redo";
import Undo from "./Undo";

export default class RedoService extends Service {
  name = "RedoService";

  register() {
    this.container.bind("RedoUndo").to(RedoUndo);

    this.container.bind("Redo").to(Redo);
    this.container.bind("Undo").to(Undo);
  }
}
