import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackingAndEditing extends ToolGroup {
  tools = [];
  constructor(
    @inject('EditingSuggesting') editingSuggesting,
    @inject('AcceptTrackChange') acceptTrackChange,
    @inject('RejectTrackChange') rejectTrackChange,
    @inject('FindAndReplace') findAndReplace,
  ) {
    super();
    this.tools = [
      findAndReplace,
      editingSuggesting,
      acceptTrackChange,
      rejectTrackChange,
    ];
  }
}

export default TrackingAndEditing;
