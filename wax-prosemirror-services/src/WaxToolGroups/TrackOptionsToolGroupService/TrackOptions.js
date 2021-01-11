import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackOptions extends ToolGroup {
  tools = [];
  constructor(
    @inject('AcceptTrackChange') acceptTrackChange,
    @inject('RejectTrackChange') rejectTrackChange,
  ) {
    super();
    this.tools = [acceptTrackChange, rejectTrackChange];
  }
}

export default TrackOptions;
