import { bulletListNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";
import BulletList from "./BulletList";

class BulletListService extends Service {
  boot() {}

  register() {
    this.container.bind("BulletList").to(BulletList);

    this.container
      .bind("schema")
      .toConstantValue({ bulletlist: bulletListNode })
      .whenTargetNamed("node");
  }
}

export default BulletListService;
