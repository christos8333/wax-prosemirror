import Service from "../../Service";
import { listItemNode } from "wax-prosemirror-schema";

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
