import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class ToggleAiTool extends ToolGroup {
  tools = [];

  constructor() {
    super();
    this.tools = [];
  }
}

export default ToggleAiTool;
