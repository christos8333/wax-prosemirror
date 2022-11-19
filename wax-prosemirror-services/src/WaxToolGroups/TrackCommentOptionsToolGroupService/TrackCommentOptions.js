/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup } from 'wax-prosemirror-core';
import TrackChangeOptionsTool from '../../CommentsService/components/ui/trackChanges/TrackChangeOptionsTool';

@injectable()
class TrackCommentOptions extends ToolGroup {
  tools = [];
  toolGroups = [];

  constructor(@inject('TrackOptions') trackOptions) {
    super();
    this.toolGroups = [
      {
        groups: [trackOptions],
      },
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

    const MemorizedComponent = useMemo(
      () => (
        <TrackChangeOptionsTool
          key={uuidv4()}
          view={view}
          groups={this._toolGroups[0].groups.map(group => ({
            //   groupName: group.title.props.title,
            items: group._tools,
          }))}
        />
      ),
      [],
    );
    return MemorizedComponent;
  }
}

export default TrackCommentOptions;
