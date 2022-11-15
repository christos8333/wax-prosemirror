import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class FillTheGap extends ToolGroup {
  tools = [];
  constructor(@inject('CreateGap') CreateGap) {
    super();
    this.tools = [CreateGap];
  }
}

export default FillTheGap;
