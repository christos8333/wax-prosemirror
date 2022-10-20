import { Service } from 'wax-prosemirror-core';
import TransformToolGroup from './TransformToolGroup';

class TransformToolGroupService extends Service {
  register() {
    this.container.bind('TransformToolGroup').to(TransformToolGroup);
  }
}

export default TransformToolGroupService;
