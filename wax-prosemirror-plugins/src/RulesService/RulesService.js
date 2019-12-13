import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  register() {
    const { schema } = this.container.get("config").options;
    const configRules = this.config[0].rules;
    const PmPlugins = this.app.PmPlugins;

    this.container
      .bind("Rules")
      .toDynamicValue(() => new Rules(schema, PmPlugins))
      .inSingletonScope();

    const rules = this.container.get("Rules");
    rules.addRule(configRules);
  }
}
