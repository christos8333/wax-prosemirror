import Service from "wax-prosemirror-core/src/services/Service";
import OverlayPlugin from "./pmPlugins/OverlayPlugin";
import OverlayComponent from "./OverlayComponent";

const PLUGIN_KEY = "overlay";

export default class OverlayService extends Service {
  boot() {}

  register() {
    this.container.bind("CreateOverlay").toFactory(context => {
      return Component => {
        const layout = context.container.get("Layout");
        debugger;
        layout.addComponent("waxOverlays", OverlayComponent(Component));
      };
    });
  }
}
