import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class HighlightToolGroup extends ToolGroup {
  tools = [];
  constructor(@inject('TextHighlightTool') texthighlight) {
    super();
    this.tools = [texthighlight];
  }
}

export default HighlightToolGroup;
