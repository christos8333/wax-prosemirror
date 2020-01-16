import Service from "wax-prosemirror-core/src/services/Service";
import { trackChangesMarks } from "wax-prosemirror-schema";

class TrackChangeService extends Service {
  boot() {}

  register() {
    const createMark = this.container.get("CreateMark");

    Object.keys(trackChangesMarks).forEach(mark => {
      createMark({
        [mark]: trackChangesMarks[mark]
      });
    });
  }
}

export default TrackChangeService;
