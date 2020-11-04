import Service from '../../Service';
import FullScreen from './FullScreen';

class FullScreenToolGroupService extends Service {
  register() {
    this.container.bind('FullScreen').to(FullScreen);
  }
}

export default FullScreenToolGroupService;
