import Service from "wax-prosemirror-core/src/services/Service";
import { codeMark } from "wax-prosemirror-schema";
import Code from "./Code";

class CodeService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");

    createMark({ code: codeMark });
  }

  register() {
    this.container.bind("Code").to(Code);
  }
}

export default CodeService;
