import Note from "./Note";
import Service from "wax-prosemirror-core/src/services/Service";
import NoteComponent from "./NoteComponent";
import { footNoteNode } from "wax-prosemirror-schema";

class NoteService extends Service {
  name = "NoteService";

  boot() {
    const layout = this.container.get("Layout");
    layout.addComponent("bottomBar", NoteComponent);
  }

  register() {
    const createNode = this.container.get("CreateNode");
    this.container.bind("Note").to(Note);

    createNode({
      footnote: footNoteNode
    });
  }
}

export default NoteService;
