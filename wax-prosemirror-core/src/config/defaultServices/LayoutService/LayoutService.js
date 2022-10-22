import Service from '../../../Service';
import Layout from './Layout';

export default class LayoutService extends Service {
  name = 'LayoutService';

  register() {
    this.container.bind('Layout').to(Layout).inSingletonScope();
  }
}
