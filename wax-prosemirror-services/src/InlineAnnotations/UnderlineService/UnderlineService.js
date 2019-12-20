import Service from "wax-prosemirror-core/src/services/Service";
import { underlineMark } from "wax-prosemirror-schema";
import Underline from "./Underline";

class UnderlineService extends Service {
  register() {
    this.container.bind("Underline").to(Underline);

    this.container
      .bind("schema")
      .toConstantValue({
        underline: underlineMark
      })
      .whenTargetNamed("mark");
  }
}

export default UnderlineService;
