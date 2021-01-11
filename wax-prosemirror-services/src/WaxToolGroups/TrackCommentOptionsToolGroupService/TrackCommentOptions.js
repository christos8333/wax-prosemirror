import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { BlockLevelTools, Tabs, ToolGroups } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ToolGroup from '../../lib/ToolGroup';

const Empty = styled.div`
  background: khaki;
  height: 100%;
`;

@injectable()
class TrackCommentOptions extends ToolGroup {
  tools = [];
  toolGroups = [];

  constructor(@inject('TrackOptions') trackOptions, @inject('Text') text) {
    super();
    this.toolGroups = [
      {
        groups: [trackOptions, text],
      },
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

    return <span>Options</span>;
  }
}

export default TrackCommentOptions;
