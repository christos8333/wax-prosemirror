import Service from "../../Service";
import { toggleMark } from "prosemirror-commands";
import { codeMark } from "wax-prosemirror-schema";
import Code from "./Code";

class CodeService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-`": toggleMark(this.schema.marks.code) });
  }

  register() {
    this.container.bind("Code").to(Code);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        code: codeMark
      },
      { toWaxSchema: true }
    );
  }
}

export default CodeService;
