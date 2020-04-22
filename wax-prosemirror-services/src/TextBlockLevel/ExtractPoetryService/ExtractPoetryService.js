import Service from "../../Service";
import { extractPoetryNode } from "wax-prosemirror-schema";
import ExtractPoetry from "./ExtractPoetry";

class ExtractPoetryService extends Service {
  boot() {}

  register() {
    this.container.bind("ExtractPoetry").to(ExtractPoetry);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        extractPoetry: extractPoetryNode
      },
      { toWaxSchema: true }
    );
  }
}

export default ExtractPoetryService;
