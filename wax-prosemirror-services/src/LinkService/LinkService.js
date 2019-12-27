import Service from "wax-prosemirror-core/src/services/Service";

import LinkComponent from "./LinkComponent";
import LinkPlugin from "./pmPlugins/LinkPlugin";
import { linkMark } from "wax-prosemirror-schema";
import LinkTool from "./LinkTool";
import { OverlayService } from "../..";

const PLUGIN_KEY = "LinkPlugin";

export default class LinkService extends Service {
  name = "LinkPlugin";

  boot() {
    // this.app.PmPlugins.add(PLUGIN_KEY, LinkPlugin(PLUGIN_KEY));

    const createOverlay = this.container.get("CreateOverlay");
    createOverlay(LinkComponent);
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

  dependencies = [new OverlayService()];
}
