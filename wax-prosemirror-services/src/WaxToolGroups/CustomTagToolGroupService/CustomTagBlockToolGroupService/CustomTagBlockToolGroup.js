import { injectable, inject } from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';
import { LeftMenuTitle } from '../../../../../wax-prosemirror-components/src/components/LeftMenuTitle';

@injectable()
class CustomTagBlockToolGroup extends ToolGroup {
  tools = [];
  title = 'Custom Block';

  constructor(@inject('CustomTagBlockTool') customTagBlock) {
    super();
    this.tools = [customTagBlock];
  }
}

export default CustomTagBlockToolGroup;
