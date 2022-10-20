import { Service } from 'wax-prosemirror-core';
import { customBlockNode } from 'wax-prosemirror-schema';
import CustomTagBlockTool from './CustomTagBlockTool';

class CustomTagBlockService extends Service {
  register() {
    this.container.bind('CustomTagBlockTool').to(CustomTagBlockTool);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        customTagBlock: customBlockNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default CustomTagBlockService;
