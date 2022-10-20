import { Service } from 'wax-prosemirror-core';
import Lists from './Lists';

class ListToolGroupService extends Service {
  register() {
    this.container.bind('Lists').to(Lists);
  }
}

export default ListToolGroupService;
