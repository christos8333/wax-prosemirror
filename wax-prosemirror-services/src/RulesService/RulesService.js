import Service from "../Service";
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
      .toDynamicValue(() => {
        const { schema: { schema } } = this.app;

        return new Rules(PmPlugins, schema);
      })
      .inSingletonScope();
  }
}
