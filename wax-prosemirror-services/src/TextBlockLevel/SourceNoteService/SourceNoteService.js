import Service from "../../Service";
import { sourceNoteNode } from "wax-prosemirror-schema";
import SourceNote from "./SourceNote";

class SourceNoteService extends Service {
  boot() {}

  register() {
    this.container.bind("SourceNote").to(SourceNote);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        sourceNote: sourceNoteNode
      },
      { toWaxSchema: true }
    );
  }
}

export default SourceNoteService;
