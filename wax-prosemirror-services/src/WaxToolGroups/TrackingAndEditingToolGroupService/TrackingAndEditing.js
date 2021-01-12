import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class TrackingAndEditing extends ToolGroup {
  tools = [];
  constructor(
    @inject('EditingSuggesting') editingSuggesting,
    @inject('FindAndReplace') findAndReplace,
  ) {
    super();
    this.tools = [findAndReplace, editingSuggesting];
  }
}

export default TrackingAndEditing;
