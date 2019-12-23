import Service from "wax-prosemirror-core/src/services/Service";
import OrderedList from "./OrderedList";

class OrderedListService extends Service {
  boot() {}

  register() {
    this.container.bind("OrderedList").to(OrderedList);
  }
}

export default OrderedListService;
