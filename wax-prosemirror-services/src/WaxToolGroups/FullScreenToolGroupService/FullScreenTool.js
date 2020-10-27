import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class FullScreenTool extends ToolGroup {
  tools = [];
  constructor(@inject('FullScreen') fullScreen) {
    super();
    this.tools = [fullScreen];
  }
}

export default FullScreenTool;
