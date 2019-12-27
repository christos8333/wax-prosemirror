import { listItemNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";

class ListItemService extends Service {
  boot() {}

  register() {
    this.container
      .bind("schema")
      .toConstantValue({ list_item: listItemNode })
      .whenTargetNamed("node");
  }
}

export default ListItemService;
