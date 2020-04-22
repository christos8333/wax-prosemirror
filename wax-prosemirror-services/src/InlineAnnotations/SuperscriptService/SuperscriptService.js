import Service from "../../Service";
import { superscriptMark } from "wax-prosemirror-schema";
import Superscript from "./Superscript";

class SuperscriptService extends Service {
  boot() {}

  register() {
    this.container.bind("Superscript").to(Superscript);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        superscript: superscriptMark
      },
      { toWaxSchema: true }
    );
  }
}

export default SuperscriptService;
