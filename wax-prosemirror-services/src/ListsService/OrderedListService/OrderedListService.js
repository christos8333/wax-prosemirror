import { orderedListNode } from "wax-prosemirror-schema";
import Service from "wax-prosemirror-core/src/services/Service";
import OrderedList from "./OrderedList";

class OrderedListService extends Service {
  boot() {}

  register() {
    this.container.bind("OrderedList").to(OrderedList);
    this.container
      .bind("schema")
      .toConstantValue({ orderedlist: orderedListNode })
      .whenTargetNamed("node");
  }
}

export default OrderedListService;
