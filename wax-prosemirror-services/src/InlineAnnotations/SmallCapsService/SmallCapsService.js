import Service from "wax-prosemirror-core/src/services/Service";
import { smallcapsMark } from "wax-prosemirror-schema";
import SmallCaps from "./SmallCaps";

class SmallCapsService extends Service {
  register() {
    this.container.bind("SmallCaps").to(SmallCaps);

    this.container
      .bind("schema")
      .toConstantValue({
        smallcaps: smallcapsMark
      })
      .whenTargetNamed("mark");
  }
}

export default SmallCapsService;
