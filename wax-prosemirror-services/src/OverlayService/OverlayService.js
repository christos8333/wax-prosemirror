import Service from "wax-prosemirror-core/src/services/Service";
import OverlayPlugin from "./pmPlugins/OverlayPlugin";
import OverlayComponent from "./OverlayComponent";

const PLUGIN_KEY = "overlay";

export default class OverlayService extends Service {
  boot() {}

  register() {
    const Components = [];
    this.container.bind("CreateOverlay").toFactory(context => {
      return Component => {
        const PmPlugins = context.container.get("PmPlugins");
        Components.push(Component);
        //PmPlugins.add(PLUGIN_KEY, OverlayPlugin(Components));
      };
    });
  }
}
