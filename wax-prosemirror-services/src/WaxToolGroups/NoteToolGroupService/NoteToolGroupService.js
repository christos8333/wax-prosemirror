import Service from "../../Service";
import Notes from "./Notes";

class NoteToolGroupService extends Service {
  name = "NoteToolGroupService";

  register() {
    this.container.bind("Notes").to(Notes);
  }
}

export default NoteToolGroupService;
