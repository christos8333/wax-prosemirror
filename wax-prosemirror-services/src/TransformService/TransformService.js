import TransformTool from './TransformTool';
import Service from '../Service';

export default class TransformService extends Service {
  register() {
    this.container.bind('TransformTool').to(TransformTool);
  }
}
