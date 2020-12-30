import { transformMark } from 'wax-prosemirror-schema';
import TransformTool from './TransformTool';
import Service from '../Service';

export default class TransformService extends Service {
  register() {
    this.container.bind('TransformTool').to(TransformTool);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        transform: transformMark,
      },
      { toWaxSchema: true },
    );
  }
}
