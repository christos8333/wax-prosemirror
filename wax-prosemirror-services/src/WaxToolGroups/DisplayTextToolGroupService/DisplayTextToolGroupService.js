import { Service } from 'wax-prosemirror-core';
import DisplayText from './DisplayText';

class DisplayTextToolGroupService extends Service {
  register() {
    this.container.bind('DisplayText').to(DisplayText);
  }
}

export default DisplayTextToolGroupService;
