import Service from "wax-prosemirror-core/src/services/Service";
import { SubTitleNode } from "wax-prosemirror-schema";
import SubTitle from "./SubTitle";

class SubTitleService extends Service {
  boot() {}

  register() {
    this.container.bind("SubTitle").to(SubTitle);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        subtitle: SubTitleNode
      },
      { toWaxSchema: true }
    );
  }
}

export default SubTitleService;
