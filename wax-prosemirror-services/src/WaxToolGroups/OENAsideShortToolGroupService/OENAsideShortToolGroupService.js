import { Service } from 'wax-prosemirror-core';
import OENAsideShortToolGroup from './OENAsideShortToolGroup';

class OENAsideShortToolGroupService extends Service {
  register() {
    this.container.bind('OENAsideShortToolGroup').to(OENAsideShortToolGroup);
  }
}

export default OENAsideShortToolGroupService;
