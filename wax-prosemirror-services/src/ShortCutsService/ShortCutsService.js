import Service from '../Service';
import ShortCuts from './ShortCuts';

export default class ShortCutsService extends Service {
  name = 'ShortCutsService';

  boot() {
    const shortCuts = this.container.get('ShortCuts');
    shortCuts.createShortCuts();
  }

  // TODO start ShortCuts as Schema is initiated
  register() {
    const { PmPlugins } = this.app;
    this.container
      .bind('ShortCuts')
      .toDynamicValue(() => {
        if (this.app.schema) {
          return new ShortCuts(
            PmPlugins,
            this.container.get('Schema').getSchema(),
          );
        }

        return new ShortCuts(
          PmPlugins,
          this.container.get('Schema').getSchema(),
        );
      })
      .inSingletonScope();
  }
}
