import { Service } from 'wax-prosemirror-core';
import FullScreenTool from './FullScreenTool';
import FullScreenToolGroupService from './FullScreenToolGroupService/FullScreenToolGroupService';

class FullScreenService extends Service {
  name = 'FullScreenService';

  register() {
    this.container.bind('FullScreenTool').to(FullScreenTool);
  }

  dependencies = [new FullScreenToolGroupService()];
}

export default FullScreenService;
