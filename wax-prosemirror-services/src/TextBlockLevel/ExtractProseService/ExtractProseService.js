import Service from "wax-prosemirror-core/src/services/Service";
import { extractProseNode } from "wax-prosemirror-schema";
import ExtractProse from "./ExtractProse";

class ExtractProseService extends Service {
  boot() {}

  register() {
    this.container.bind("ExtractProse").to(ExtractProse);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        extractProse: extractProseNode
      },
      { toWaxSchema: true }
    );
  }
}

export default ExtractProseService;
