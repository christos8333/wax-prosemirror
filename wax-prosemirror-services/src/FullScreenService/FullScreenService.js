import { Service } from 'wax-prosemirror-core';
import FullScreenTool from './FullScreenTool';

class FullScreenService extends Service {
  name = 'FullScreenService';

  register() {
    this.container.bind('FullScreenTool').to(FullScreenTool);
  }
}

export default FullScreenService;
