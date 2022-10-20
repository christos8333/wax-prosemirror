import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class TrackOptions extends ToolGroup {
  tools = [];
  constructor(
    @inject('ShowHideTrackChange') showHideTrackChange,
    @inject('AcceptTrackChange') acceptTrackChange,
    @inject('RejectTrackChange') rejectTrackChange,
  ) {
    super();
    this.tools = [showHideTrackChange, acceptTrackChange, rejectTrackChange];
  }
}

export default TrackOptions;
