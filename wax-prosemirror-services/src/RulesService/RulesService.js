import Service from '../Service';
import Rules from './Rules';

export default class RulesService extends Service {
  name = 'RulesService';

  boot() {
    const configRules = this.app.config.get('config.RulesService');
    const rules = this.container.get('Rules');
    if (configRules) rules.addRule(configRules);
    rules.createRules();
  }

  register() {
    const { PmPlugins } = this.app;

    this.container
      .bind('Rules')
      .toDynamicValue(() => {
        const {
          schema: { schema },
        } = this.app;

        return new Rules(PmPlugins, schema);
      })
      .inSingletonScope();
  }
}
