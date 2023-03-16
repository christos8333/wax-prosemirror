import { Service } from 'wax-prosemirror-core';
import AnyStyle from './AnyStyle';

class AnyStyleToolGroupService extends Service {
  register() {
    this.container.bind('AnyStyle').to(AnyStyle);
  }
}

export default AnyStyleToolGroupService;
