import { Service } from 'wax-prosemirror-core';
import OENTools from './OENTools';

class OENLeftToolGroupService extends Service {
  register() {
    this.container.bind('OENTools').to(OENTools);
  }
}

export default OENLeftToolGroupService;
