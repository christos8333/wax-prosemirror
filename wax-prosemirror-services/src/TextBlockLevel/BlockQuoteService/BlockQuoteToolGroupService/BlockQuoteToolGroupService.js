import { Service } from 'wax-prosemirror-core';
import BlockQuoteTool from './BlockQuoteTool';

class BlockQuoteToolGroupService extends Service {
  register() {
    this.container.bind('BlockQuoteTool').to(BlockQuoteTool);
  }
}

export default BlockQuoteToolGroupService;
