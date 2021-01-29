import CustomTagBlockTool from './CustomTagBlockTool';
import Service from '../../Service';
import { customBlockNode } from 'wax-prosemirror-schema';


class CustomTagBlockService extends Service {

  register() {
    this.container.bind('CustomTagBlockTool').to(CustomTagBlockTool);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        customTagBlock: customBlockNode,
      }
    );
  }

}

export default CustomTagBlockService;