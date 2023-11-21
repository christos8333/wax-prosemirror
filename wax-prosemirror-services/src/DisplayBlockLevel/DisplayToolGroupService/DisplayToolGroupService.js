import { Service } from 'wax-prosemirror-core';
import Display from './Display';

class DisplayToolGroupService extends Service {
  register() {
    this.container.bind('Display').to(Display);
  }
}

export default DisplayToolGroupService;
