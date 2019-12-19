import Service from "wax-prosemirror-core/src/services/Service";
import { emphasisMark } from "wax-prosemirror-schema";
import Emphasis from "./Emphasis";

class EmphasisService extends Service {
  register() {
    this.container.bind("Emphasis").to(Emphasis);

    this.container
      .bind("schema")
      .toConstantValue({
        em: emphasisMark
      })
      .whenTargetNamed("mark");
  }
}

export default EmphasisService;
