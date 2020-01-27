import { bulletListNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";
import BulletList from "./BulletList";

class BulletListService extends Service {
  boot() {}

  register() {
    this.container.bind("BulletList").to(BulletList);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        bulletlist: bulletListNode
      },
      { toWaxSchema: true }
    );
  }
}

export default BulletListService;
