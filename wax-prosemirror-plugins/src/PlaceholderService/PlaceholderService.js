import Service from "wax-prosemirror-core/src/services/Service";
import placeholderPlugin from "./pmPlugins/placeholderPlugin";
const PLUGIN_KEY = "placeHolder";

export default class PlaceholderService extends Service {
  name = "PlaceholderService";

  register() {
    this.app.PmPlugins.add(PLUGIN_KEY, placeholderPlugin(PLUGIN_KEY));
  }
}
