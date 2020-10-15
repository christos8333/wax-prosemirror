import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackingAndEditing extends ToolGroup {
  tools = [];
  constructor(@inject('FindAndReplace') findAndReplace) {
    super();
    this.tools = [findAndReplace];
  }
}

export default TrackingAndEditing;
