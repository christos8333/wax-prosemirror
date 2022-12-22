import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class FindAndReplaceTool extends ToolGroup {
  tools = [];
  constructor(@inject('FindAndReplace') findAndReplace) {
    super();
    this.tools = [findAndReplace];
  }
}

export default FindAndReplaceTool;
