import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class CustomTagInlineToolGroup extends ToolGroup {
  tools = [];

  constructor(@inject('CustomTagInlineTool') customTagInline) {
    super();
    this.tools = [customTagInline];
  }
}

export default CustomTagInlineToolGroup;
