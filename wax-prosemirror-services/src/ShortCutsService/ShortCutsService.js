import Service from '../Service';
import ShortCuts from './ShortCuts';

export default class ShortCutsService extends Service {
  name = 'ShortCutsService';

  register() {
    this.container.bind('ShortCuts').to(ShortCuts).inSingletonScope();

    this.container.bind('CreateShortCut').toFactory(context => {
      return shortCut => {
        const shortCutsInstance = context.container.get('ShortCuts');
        shortCutsInstance.addShortCut(shortCut);
      };
    });
  }
}
