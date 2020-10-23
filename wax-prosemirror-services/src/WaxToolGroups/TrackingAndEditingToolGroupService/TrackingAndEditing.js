import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackingAndEditing extends ToolGroup {
  tools = [];
  constructor(
    @inject('EnableTrackChange') enableTrackChange,
    @inject('AcceptTrackChange') acceptTrackChange,
    @inject('RejectTrackChange') rejectTrackChange,
    @inject('FindAndReplace') findAndReplace,
  ) {
    super();
    this.tools = [
      findAndReplace,
      enableTrackChange,
      acceptTrackChange,
      rejectTrackChange,
    ];
  }
}

export default TrackingAndEditing;
