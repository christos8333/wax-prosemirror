import { listItemNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";

class ListItemService extends Service {
  boot() {}

  register() {
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        list_item: listItemNode
      },
      { toWaxSchema: true }
    );
  }
}

export default ListItemService;
