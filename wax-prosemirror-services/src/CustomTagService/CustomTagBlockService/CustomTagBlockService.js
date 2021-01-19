import CustomTagBlockTool from './CustomTagBlockTool';
import Service from '../../Service';
import { customtagBlockMark } from 'wax-prosemirror-schema';

export default class CustomTagBlockService extends Service {
  
  register() {
    this.container.bind('CustomTagBlockTool').to(CustomTagBlockTool);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        customTagBlock: customtagBlockMark,
      },
      { toWaxSchema: true },
    );
  }
}