import Service from "wax-prosemirror-core/src/services/Service";
import Plugins from "./Plugins";

export default class PluginsService extends Service {
  name = "PluginsService";

  boot() {
    this.container.get("Plugins");
  }

  register() {
    const PmPlugins = this.app.PmPlugins;
    const configPlugins = this.config;
    console.log(this.config, "config");

    this.container
      .bind("Plugins")
      .toDynamicValue(() => new Plugins())
      .inSingletonScope();
  }
}
