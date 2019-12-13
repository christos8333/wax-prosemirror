import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  boot() {
    this.container.get("Rules").createRules();
  }

  register() {
    const { schema } = this.container.get("config").options;
    const PmPlugins = this.app.PmPlugins;

    this.container
      .bind("Rules")
      .toDynamicValue(() => new Rules(schema, PmPlugins))
      .inSingletonScope();
    const configRules = this.config[0].rules;
    const rules = this.container.get("Rules");
    rules.addRule(configRules);
  }
}
