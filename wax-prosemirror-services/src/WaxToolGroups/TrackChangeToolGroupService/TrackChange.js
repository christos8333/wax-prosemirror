import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackChange extends ToolGroup {
  tools = [];
  constructor(@inject('EnableTrackChange') enableTrackChange) {
    super();
    this.tools = [enableTrackChange];
  }
}

export default TrackChange;
