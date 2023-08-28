import { Service } from 'wax-prosemirror-core';
import Tables from './Tables';

class TableToolGroupService extends Service {
  register() {
    this.container.bind('Tables').to(Tables);
  }
}

export default TableToolGroupService;
