import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-services';

@injectable()
class FillTheGap extends ToolGroup {
  tools = [];
  constructor(@inject('FillTheGapQuestion') FillTheGapQuestion) {
    super();
    this.tools = [FillTheGapQuestion];
  }
}

export default FillTheGap;
