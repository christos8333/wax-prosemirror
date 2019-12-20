import { toggleMark } from "prosemirror-commands";
import Service from "wax-prosemirror-core/src/services/Service";
import { emphasisMark } from "wax-prosemirror-schema";
import Emphasis from "./Emphasis";

class EmphasisService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-i": toggleMark(this.schema.marks.em) });
  }

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
