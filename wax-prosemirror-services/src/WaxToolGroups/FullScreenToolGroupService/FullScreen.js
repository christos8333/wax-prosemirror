import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class FullScreen extends ToolGroup {
  tools = [];
  constructor(@inject('FullScreenTool') fullScreenTool) {
    super();
    this.tools = [fullScreenTool];
  }
}

export default FullScreen;
