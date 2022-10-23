import { Service } from 'wax-prosemirror-core';
import FullScreen from './FullScreen';

class FullScreenToolGroupService extends Service {
  register() {
    this.container.bind('FullScreen').to(FullScreen);
  }
}

export default FullScreenToolGroupService;
