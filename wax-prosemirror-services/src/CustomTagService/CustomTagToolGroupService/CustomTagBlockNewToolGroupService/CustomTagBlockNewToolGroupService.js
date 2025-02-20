import { Service } from 'wax-prosemirror-core';
import CustomTagBlockNewToolGroup from './CustomTagBlockNewToolGroup';

class CustomTagBlockNewToolGroupService extends Service {
  register() {
    this.container.bind('CustomTagBlock').to(CustomTagBlockNewToolGroup);
  }
}

export default CustomTagBlockNewToolGroupService;
