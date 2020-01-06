import { toggleMark } from "prosemirror-commands";
import Service from "wax-prosemirror-core/src/services/Service";
import { underlineMark } from "wax-prosemirror-schema";
import Underline from "./Underline";

class UnderlineService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-u": toggleMark(this.schema.marks.underline) });
  }

  register() {
    this.container.bind("Underline").to(Underline);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        underline: underlineMark
      },
      { toWaxSchema: true }
    );
  }
}

export default UnderlineService;
