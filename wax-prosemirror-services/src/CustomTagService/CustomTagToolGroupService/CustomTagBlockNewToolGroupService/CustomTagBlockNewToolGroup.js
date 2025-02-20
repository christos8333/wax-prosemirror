import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class CustomTagBlockToolGroup extends ToolGroup {
  tools = [];
  title = 'Custom Block';

  constructor(@inject('CustomTagBlockNewTool') customTagBlockNewTool) {
    super();
    this.tools = [customTagBlockNewTool];
  }
}

export default CustomTagBlockToolGroup;
