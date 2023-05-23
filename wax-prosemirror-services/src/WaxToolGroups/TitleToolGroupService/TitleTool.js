import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class TitleTool extends ToolGroup {
  tools = [];

  constructor(@inject('Title') title) {
    super();
    this.tools = [title];
  }
}

export default TitleTool;
