import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class TransformToolGroup extends ToolGroup {
  tools = [];

  constructor(@inject('TransformTool') transformCase) {
    super();
    this.tools = [transformCase];
  }
}

export default TransformToolGroup;
