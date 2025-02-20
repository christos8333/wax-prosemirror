import { Service } from 'wax-prosemirror-core';
import customBlockNode from '../CustomTagBlockService/schema/customBlockNode';
import CustomTagBlockNewTool from './CustomTagBlockNewTool';

class CustomTagBlockNewService extends Service {
  register() {
    this.container.bind('CustomTagBlockNewTool').to(CustomTagBlockNewTool);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        customTagBlock: customBlockNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default CustomTagBlockNewService;
