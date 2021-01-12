import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { TrackChangeOptionsTool } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ToolGroup from '../../lib/ToolGroup';

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
    return (
      <TrackChangeOptionsTool
        key={uuidv4()}
        view={view}
        groups={this._toolGroups[0].groups.map(group => ({
          //   groupName: group.title.props.title,
          items: group._tools,
        }))}
      />
    );
  }
}

export default TrackCommentOptions;
