import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class NumericalAnswer extends ToolGroup {
  tools = [];
  constructor() {
    super();
    this.tools = [];
  }
}

export default NumericalAnswer;
