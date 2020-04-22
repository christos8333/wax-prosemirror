import Service from "../../Service";
import { smallcapsMark } from "wax-prosemirror-schema";
import SmallCaps from "./SmallCaps";

class SmallCapsService extends Service {
  register() {
    this.container.bind("SmallCaps").to(SmallCaps);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        smallcaps: smallcapsMark
      },
      { toWaxSchema: true }
    );
  }
}

export default SmallCapsService;
