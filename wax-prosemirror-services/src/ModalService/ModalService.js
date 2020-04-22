import { Service } from "wax-prosemirror-core";
import ModalPlugin from "./pmPlugins/ModalPlugin";
import ModalComponent from "./ModalComponent";
const PLUGIN_KEY = "overlay";

export default class ModalService extends Service {
  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, ModalPlugin(PLUGIN_KEY));
  }
  register() {
    this.container.bind("CreateModal").toFactory(context => {
      return (Component, pluginName) => {
        const PmPlugins = context.container.get("PmPlugins");
        const plugin = PmPlugins.get(pluginName);
        const layout = context.container.get("Layout");
        layout.addComponent(
          "editorOverlays",
          ModalComponent(Component, plugin)
        );
      };
    });
  }
}
