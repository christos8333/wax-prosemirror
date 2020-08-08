import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackChange extends ToolGroup {
  tools = [];
  constructor(
    @inject('EnableTrackChange') enableTrackChange,
    @inject('AcceptTrackChange') acceptTrackChange,
    @inject('RejectTrackChange') rejectTrackChange,
  ) {
    super();
    this.tools = [enableTrackChange, acceptTrackChange, rejectTrackChange];
  }
}

export default TrackChange;
