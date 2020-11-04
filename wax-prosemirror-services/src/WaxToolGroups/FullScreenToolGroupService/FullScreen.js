import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class FullScreen extends ToolGroup {
  tools = [];
  constructor(@inject('FullScreenTool') fullScreenTool) {
    super();
    this.tools = [fullScreenTool];
  }
}

export default FullScreen;
