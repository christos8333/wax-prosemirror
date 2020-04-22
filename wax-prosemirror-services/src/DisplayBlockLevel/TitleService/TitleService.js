import Service from "../../Service";
import { titleNode } from "wax-prosemirror-schema";
import Title from "./Title";

class TitleService extends Service {
  boot() {}

  register() {
    this.container.bind("Title").to(Title);
    const createNode = this.container.get("CreateNode");
    createNode(
      {
        title: titleNode
      },
      { toWaxSchema: true }
    );
  }
}

export default TitleService;
