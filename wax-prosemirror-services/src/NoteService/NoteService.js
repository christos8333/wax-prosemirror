import { Service } from "wax-prosemirror-core";
import { footNoteNode } from "wax-prosemirror-schema";
import { CommentBubbleComponent } from "wax-prosemirror-components";
import Note from "./Note";
import NoteComponent from "./NoteComponent";

class NoteService extends Service {
  name = "NoteService";

  boot() {
    const layout = this.container.get("Layout");
    const createOverlay = this.container.get("CreateOverlay");
    layout.addComponent("notesArea", NoteComponent);
    createOverlay(
      CommentBubbleComponent,
      {
        showComment: activeViewId => activeViewId !== "main",
        group: "notes"
      },
      {
        markType: "",
        followCursor: false,
        selection: true
      }
    );
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
