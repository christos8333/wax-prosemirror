import Service from "wax-prosemirror-core/src/services/Service";
import { subscriptMark } from "wax-prosemirror-schema";
import Subscript from "./Subscript";

class SubscriptService extends Service {
  boot() {}

  register() {
    this.container
      .bind("schema")
      .toConstantValue({ subscript: subscriptMark })
      .whenTargetNamed("mark");

    this.container.bind("Subscript").to(Subscript);
  }
}

export default SubscriptService;
