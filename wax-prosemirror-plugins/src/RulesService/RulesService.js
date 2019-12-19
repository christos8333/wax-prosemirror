import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  boot() {
    const configRules = this.config;
    const rules = this.container.get("Rules");
    rules.addRule(configRules);
    rules.createRules();
  }

  register() {
    const PmPlugins = this.app.PmPlugins;

    this.container
      .bind("Rules")
      .toDynamicValue(() => new Rules(PmPlugins))
      .inSingletonScope();
  }
}
