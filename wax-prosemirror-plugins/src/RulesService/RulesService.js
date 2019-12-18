import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  boot() {
    this.container.get("Rules").createRules();
  }

  register() {
    const PmPlugins = this.app.PmPlugins;
    const configRules = this.config;

    this.container
      .bind("Rules")
      .toDynamicValue(() => {
        const { schema } = this;
        return new Rules(schema, PmPlugins);
      })
      .inSingletonScope();
    const rules = this.container.get("Rules");
    rules.addRule(configRules);
  }
}
