import Service from "wax-prosemirror-core/src/services/Service";
import { codeMark } from "wax-prosemirror-schema";
import Code from "./Code";

class CodeService extends Service {
  boot() {}

  register() {
    this.container
      .bind("schema")
      .toConstantValue({ code: codeMark })
      .whenTargetNamed("mark");

    this.container.bind("Code").to(Code);
  }
}

export default CodeService;
