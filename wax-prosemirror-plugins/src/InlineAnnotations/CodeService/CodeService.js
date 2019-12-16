import Service from "wax-prosemirror-core/src/services/Service";

class CodeService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");
    console.log(createMark, "maamamam");
    createMark({
      code: {
        parseDOM: [{ tag: "code" }],
        toDOM() {
          return codeDOM;
        }
      }
    });
  }

  register() {}
}

export default CodeService;
