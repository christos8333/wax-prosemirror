import Service from "wax-prosemirror-core/src/services/Service";
import { codeMark } from "wax-prosemirror-schema";
import Code from "./Code";
console.log(codeMark);
class CodeService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");
    createMark({
      code: {
        parseDOM: [{ tag: "code" }],
        toDOM(hook, next) {
          hook.value = ["code", 0];
          next();
        }
      }
    });
  }

  register() {
    this.container.bind("Code").to(Code);
  }
}

export default CodeService;
