import Service from "wax-prosemirror-core/src/services/Service";
import BulletList from "./BulletList";

class BulletListService extends Service {
  boot() {}

  register() {
    this.container.bind("BulletList").to(BulletList);
  }
}

export default BulletListService;
