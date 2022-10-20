import { Service } from 'wax-prosemirror-core';
import CustomTagBlockToolGroup from './CustomTagBlockToolGroup';

class CustomTagBlockToolGroupService extends Service {
  register() {
    this.container.bind('CustomTagBlockToolGroup').to(CustomTagBlockToolGroup);
  }
}

export default CustomTagBlockToolGroupService;
