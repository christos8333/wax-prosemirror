import { Service } from "wax-prosemirror-core";
import { wrapInList } from "prosemirror-schema-list";
import { bulletListNode } from "wax-prosemirror-schema";
import BulletList from "./BulletList";

class BulletListService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    // shortCuts.addShortCut({
    //   "Shift-Ctrl-8": wrapInList(this.schema.nodes.bulletlist)
    // });
  }

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
