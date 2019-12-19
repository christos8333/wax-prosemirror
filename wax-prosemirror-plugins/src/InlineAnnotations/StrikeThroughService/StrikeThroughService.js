import Service from "wax-prosemirror-core/src/services/Service";
import { strikethroughMark } from "wax-prosemirror-schema";
import StrikeThrough from "./StrikeThrough";
console.log(strikethroughMark);
class StrikeThroughService extends Service {
  register() {
    this.container.bind("StrikeThrough").to(StrikeThrough);

    this.container
      .bind("schema")
      .toConstantValue({
        em: strikethroughMark
      })
      .whenTargetNamed("mark");
  }
}

export default StrikeThroughService;
