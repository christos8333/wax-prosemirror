import Service from "wax-prosemirror-core/src/services/Service";
import placeholderPlugin from "./pmPlugins/placeholderPlugin";
const PLUGIN_KEY = "imagePlaceHolder";
import { emDash } from "prosemirror-inputrules";

export default class PlaceholderService extends Service {
  name = "PlaceholderService";

  register() {
    const rules = this.container.get("Rules");
    rules.addRule([emDash]);
    this.app.PmPlugins.add(PLUGIN_KEY, placeholderPlugin(PLUGIN_KEY));
  }
}
