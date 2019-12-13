import Service from "wax-prosemirror-core/src/services/Service";
// import Plugins from "./Plugins";

export default class PluginsService extends Service {
  name = "PluginsService";

  boot() {}
  register() {
    const PmPlugins = this.app.PmPlugins;
    console.log(this.config, "config");
  }
}
