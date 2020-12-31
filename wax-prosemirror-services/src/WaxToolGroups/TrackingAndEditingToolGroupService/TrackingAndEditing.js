import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { ToolGroupComponent } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
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

  renderTools(view) {
    if (isEmpty(view)) return null;

    const { name } = this.constructor;

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          view={view}
          tools={this._tools}
          title={this.title}
          name={name}
        />
      ),
      [],
    );

    return MemorizedToolGroupComponent;
  }
}

export default TrackingAndEditing;
