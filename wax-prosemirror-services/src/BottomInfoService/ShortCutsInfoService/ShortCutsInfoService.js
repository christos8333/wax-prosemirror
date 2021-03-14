import Service from '../../Service';
import ShortCutsInfoTool from './ShortCutsInfoTool';

export default class ShortCutsInfoService extends Service {
  register() {
    this.container.bind('ShortCutsInfoTool').to(ShortCutsInfoTool);
  }
}
