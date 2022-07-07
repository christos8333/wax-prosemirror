import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class OENContainersToolGroup extends ToolGroup {
  tools = [];
  title = 'OEN Containers';

  constructor(@inject('OENContainersTool') OENContainersTool) {
    super();
    this.tools = [OENContainersTool];
  }
}

export default OENContainersToolGroup;
