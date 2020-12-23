import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class InfoToolGroup extends ToolGroup {
    tools = [];
    constructor(
      @inject('CounterInfoTool') counterinfotool,
      @inject('ShortcutTool') shortcuttools,
      @inject('HelpTool') helptool,
      ) {
        
        super();
        this.tools = [counterinfotool,shortcuttools,helptool];
      }
}

export default InfoToolGroup;