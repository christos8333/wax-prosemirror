import LinkPlugin from "./LinkPlugin";
import Service from "wax-prosemirror-core/src/services/Service";
import find from "./pmPlugins/find";
import placeholder from "./pmPlugins/placeholder";

export default class myLinkPluginService extends Service {
  name = "LinkPlugin";

  boot() {
    const test = this.container.get("LinkPlugin");
    console.log(test);
  }

  register() {
    this.container.bind(this.name).to(LinkPlugin);

    this.container.bind("findPlugin").toFactory(find);

    this.container.bind("placeholderPlugin").toFactory(placeholder);
  }
}
