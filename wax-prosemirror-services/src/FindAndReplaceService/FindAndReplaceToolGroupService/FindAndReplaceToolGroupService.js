import { Service } from 'wax-prosemirror-core';
import FindAndReplaceTool from './FindAndReplaceTool';

class FindAndReplaceToolGroupService extends Service {
  register() {
    this.container.bind('FindAndReplaceTool').to(FindAndReplaceTool);
  }
}

export default FindAndReplaceToolGroupService;
