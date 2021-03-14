import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class InfoToolGroup extends ToolGroup {
  tools = [];
  constructor(
    @inject('CounterInfoTool') counterinfotool,
    @inject('ShortCutsInfoTool') shortcutsinfotool,
  ) {
    super();
    this.tools = [counterinfotool, shortcutsinfotool];
  }
}

export default InfoToolGroup;
