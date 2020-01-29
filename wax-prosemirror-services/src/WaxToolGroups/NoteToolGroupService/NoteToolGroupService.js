import Notes from "./Notes";
import Service from "wax-prosemirror-core/src/services/Service";

class NoteToolGroupService extends Service {
  name = "NoteToolGroupService";

  register() {
    this.container.bind("Notes").to(Notes);
  }
}

export default NoteToolGroupService;
