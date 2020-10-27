import Service from '../Service';
import FullScreenTool from './FullScreenTool';

class FullScreenService extends Service {
  name = 'FullScreenService';

  register() {
    this.container.bind('FullScreenTool').to(FullScreenTool);
  }
}

export default FullScreenService;
