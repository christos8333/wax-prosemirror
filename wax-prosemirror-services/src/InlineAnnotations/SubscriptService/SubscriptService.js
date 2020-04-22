import Service from "../../Service";
import { subscriptMark } from "wax-prosemirror-schema";
import Subscript from "./Subscript";

class SubscriptService extends Service {
  boot() {}

  register() {
    this.container.bind("Subscript").to(Subscript);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        subscript: subscriptMark
      },
      { toWaxSchema: true }
    );
  }
}

export default SubscriptService;
