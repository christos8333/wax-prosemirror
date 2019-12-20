import Service from "wax-prosemirror-core/src/services/Service";
import { superscriptMark } from "wax-prosemirror-schema";
import Superscript from "./Superscript";

class SuperscriptService extends Service {
  boot() {}

  register() {
    this.container
      .bind("schema")
      .toConstantValue({ superscript: superscriptMark })
      .whenTargetNamed("mark");

    this.container.bind("Superscript").to(Superscript);
  }
}

export default SuperscriptService;
