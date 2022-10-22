import { Service } from 'wax-prosemirror-core';
import blockQuoteNode from './schema/blockQuoteNode';
import BlockQuote from './BlockQuote';
import './blockQuote.css';

class BlockQuoteService extends Service {
  name = 'BlockQuoteService';

  register() {
    this.container.bind('BlockQuote').to(BlockQuote);
    const createNode = this.container.get('CreateNode');
    createNode({
      blockquote: blockQuoteNode,
    });
  }
}

export default BlockQuoteService;
