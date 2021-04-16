import Service from '../Service';
import ShortCuts from './ShortCuts';

export default class ShortCutsService extends Service {
  name = 'ShortCutsService';

  boot() {
    const shortCuts = this.container.get('ShortCuts');
    shortCuts.createShortCuts();
  }

  register() {
    const { PmPlugins } = this.app;
    this.container
      .bind('ShortCuts')
      .toDynamicValue(() => {
        const {
          schema: { schema },
        } = this.app;

        return new ShortCuts(PmPlugins, schema);
      })
      .inSingletonScope();
  }
}
