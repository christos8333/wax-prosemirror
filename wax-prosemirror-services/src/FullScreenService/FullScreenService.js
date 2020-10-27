import Service from '../Service';
import FullScreen from './FullScreen';

class FullScreenService extends Service {
  name = 'FullScreenService';

  register() {
    this.container.bind('FullScreen').to(FullScreen);
  }
}

export default FullScreenService;
