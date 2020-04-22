import { Service } from "wax-prosemirror-core";
import placeholderPlugin from "./pmPlugins/placeholderPlugin";
const PLUGIN_KEY = "imagePlaceHolder";

export default class PlaceholderService extends Service {
  name = "PlaceholderService";

  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, placeholderPlugin(PLUGIN_KEY));
  }
}
