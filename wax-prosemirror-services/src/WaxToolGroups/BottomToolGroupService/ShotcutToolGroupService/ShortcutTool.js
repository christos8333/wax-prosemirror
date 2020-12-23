import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class ShortcutToolGroup extends ToolGroup {
    tools = [];
    constructor(
      @inject('ShortcutTool') shortcuttool,
      ) {
        
        super();
        this.tools = [shortcuttool];
      }
}

export default ShortcutToolGroup;