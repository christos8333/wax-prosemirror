import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class BlockQuoteTool extends ToolGroup {
  tools = [];
  title = '';

  constructor(@inject('BlockQuote') blockQuote, @inject('Lift') lift) {
    super();
    this.tools = [blockQuote, lift];
  }
}

export default BlockQuoteTool;
