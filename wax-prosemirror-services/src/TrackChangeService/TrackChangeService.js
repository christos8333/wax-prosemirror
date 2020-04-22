import Service from "../Service";
import { trackChangesMarks, trackChangesNodes } from "wax-prosemirror-schema";

class TrackChangeService extends Service {
  boot() {}

  register() {
    const createMark = this.container.get("CreateMark");
    const createNode = this.container.get("CreateNode");

    Object.keys(trackChangesMarks).forEach(mark => {
      createMark({
        [mark]: trackChangesMarks[mark]
      });
    });

    Object.keys(trackChangesNodes).forEach(node => {
      createNode(
        {
          [node]: trackChangesNodes[node]
        },
        { toWaxSchema: true }
      );
    });
  }
}

export default TrackChangeService;
