import Service from "../../Service";
import { toggleMark } from "prosemirror-commands";
import { emphasisMark } from "wax-prosemirror-schema";
import Emphasis from "./Emphasis";

class EmphasisService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-i": toggleMark(this.schema.marks.em) });
  }

  register() {
    this.container.bind("Emphasis").to(Emphasis);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        em: emphasisMark
      },
      { toWaxSchema: true }
    );
  }
}

export default EmphasisService;
