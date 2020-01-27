import { orderedListNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";
import OrderedList from "./OrderedList";

class OrderedListService extends Service {
  boot() {}

  register() {
    this.container.bind("OrderedList").to(OrderedList);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        orderedlist: orderedListNode
      },
      { toWaxSchema: true }
    );
  }
}

export default OrderedListService;
