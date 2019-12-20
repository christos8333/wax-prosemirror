import Service from "wax-prosemirror-core/src/services/Service";
import LinkComponent from "./LinkComponent";
import { linkMark } from "wax-prosemirror-schema";
import LinkTool from "./LinkTool";

export default class LinkService extends Service {
  name = "LinkPlugin";

  boot() {
    //Set Layout
    const layout = this.container.get("Layout");
    layout.addComponent("editorOverlays", LinkComponent);
  }

  register() {
    this.container.bind("Link").to(LinkTool);

    this.container
      .bind("schema")
      .toConstantValue({
        link: linkMark
      })
      .whenTargetNamed("mark");
  }
}
