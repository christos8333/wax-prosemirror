import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  register() {
    const { schema } = this.container.get("config").options;

    this.container.bind("Rules").toFactory(context => {
      const rules = new Rules(this.config[0], schema);
      this.app.PmPlugins.add("rules", rules);
    });

    this.container.get("Rules");
  }
}
