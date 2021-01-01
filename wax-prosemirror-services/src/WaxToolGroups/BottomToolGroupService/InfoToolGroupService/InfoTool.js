import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class InfoToolGroup extends ToolGroup {
  tools = [];
  constructor(@inject('CounterInfoTool') counterinfotool) {
    super();
    this.tools = [counterinfotool];
  }
}

export default InfoToolGroup;
