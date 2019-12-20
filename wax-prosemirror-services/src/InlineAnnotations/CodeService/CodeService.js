import { toggleMark } from "prosemirror-commands";
import Service from "wax-prosemirror-core/src/services/Service";
import { codeMark } from "wax-prosemirror-schema";
import Code from "./Code";

class CodeService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-`": toggleMark(this.schema.marks.code) });
  }

  register() {
    this.container
      .bind("schema")
      .toConstantValue({ code: codeMark })
      .whenTargetNamed("mark");

    this.container.bind("Code").to(Code);
  }
}

export default CodeService;
