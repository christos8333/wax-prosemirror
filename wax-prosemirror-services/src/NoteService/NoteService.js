import Note from "./Note";
import Service from "wax-prosemirror-core/src/services/Service";
import NoteComponent from "./NoteComponent";

class NoteService extends Service {
  name = "NoteService";

  boot() {
    const layout = this.container.get("Layout");
    layout.addComponent("bottomBar", NoteComponent);
  }

  register() {
    this.container.bind("Note").to(Note);
  }
}

export default NoteService;
