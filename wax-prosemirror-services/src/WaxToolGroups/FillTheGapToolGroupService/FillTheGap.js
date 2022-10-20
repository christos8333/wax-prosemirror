import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class FillTheGap extends ToolGroup {
  tools = [];
  constructor(
    @inject('FillTheGapQuestion') FillTheGapQuestion,
    @inject('CreateGap') CreateGap,
  ) {
    super();
    this.tools = [FillTheGapQuestion, CreateGap];
  }
}

export default FillTheGap;
