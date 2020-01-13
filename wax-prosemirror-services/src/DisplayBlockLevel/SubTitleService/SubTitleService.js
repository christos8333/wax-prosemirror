import Service from "wax-prosemirror-core/src/services/Service";
import { subTitleNode } from "wax-prosemirror-schema";
import SubTitle from "./SubTitle";

class SubTitleService extends Service {
  boot() {}

  register() {
    this.container.bind("SubTitle").to(SubTitle);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        subtitle: subTitleNode
      },
      { toWaxSchema: true }
    );
  }
}

export default SubTitleService;
