import { Service } from 'wax-prosemirror-core';
import TransformTool from './TransformTool';

export default class TransformService extends Service {
  register() {
    this.container.bind('TransformTool').to(TransformTool);
  }
}
