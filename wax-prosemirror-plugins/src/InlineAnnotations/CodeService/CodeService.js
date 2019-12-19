import Service from "wax-prosemirror-core/src/services/Service";
import Code from "./Code";

class CodeService extends Service {
  boot() {}

  register() {
    this.container
      .bind("schema")
      .toConstantValue({
        code: {
          parseDOM: { tag: "code" },
          toDOM(hook, next) {
            hook.value = ["code", 0];
            next();
          }
        }
      })
      .whenTargetNamed("mark");

    this.container.bind("Code").to(Code);
  }
}

export default CodeService;
