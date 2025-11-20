import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup, ToolGroupComponent } from 'wax-prosemirror-core';

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

  renderTools(view) {
    if (isEmpty(view)) return null;

    const { name } = this.constructor;

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          name={name}
          title={this.title}
          tools={this._tools}
          view={view}
        />
      ),
      [view],
    );

    return MemorizedToolGroupComponent;
  }
}

export default TrackOptions;
