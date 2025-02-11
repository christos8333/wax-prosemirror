import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class TrackingAndEditing extends ToolGroup {
  tools = [];
  constructor(
    @inject('EditingSuggesting') editingSuggesting,
    // @inject('FindAndReplace') findAndReplace,
  ) {
    super();
    this.tools = [editingSuggesting];
  }
}

export default TrackingAndEditing;
