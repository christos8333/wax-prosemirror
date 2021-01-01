import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class HelpToolGroup extends ToolGroup {
    tools = [];
    constructor(
      @inject('HelpTool') helptool,
      ) {
        
        super();
        this.tools = [helptool];
      }
}

export default HelpToolGroup;