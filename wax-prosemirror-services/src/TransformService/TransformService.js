import { Service } from 'wax-prosemirror-core';
import TransformTool from './TransformTool';
import TransformToolGroupService from './TransformToolGroupService/TransformToolGroupService';

export default class TransformService extends Service {
  register() {
    this.container.bind('TransformTool').to(TransformTool);
  }

  dependencies = [new TransformToolGroupService()];
}
