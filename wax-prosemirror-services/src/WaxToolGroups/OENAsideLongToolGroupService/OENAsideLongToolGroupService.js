import { Service } from 'wax-prosemirror-core';
import OENAsideLongToolGroup from './OENAsideLongToolGroup';

class OENAsideLongToolGroupService extends Service {
  register() {
    this.container.bind('OENAsideLongToolGroup').to(OENAsideLongToolGroup);
  }
}

export default OENAsideLongToolGroupService;
