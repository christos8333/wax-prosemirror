import Service from '../Service';
import Rules from './Rules';

export default class RulesService extends Service {
  name = 'RulesService';

  boot() {
    const configRules = this.app.config.get('config.RulesService');
    const createRule = this.container.get('CreateRule');
    if (configRules) createRule(configRules);
  }

  register() {
    this.container.bind('Rules').to(Rules).inSingletonScope();
    this.container.bind('CreateRule').toFactory(context => {
      return rule => {
        const ruleInstance = context.container.get('Rules');
        ruleInstance.addRule(rule);
      };
    });
  }
}
