/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { OENBlockLevelTools, Tabs } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ToolGroup from '../../lib/ToolGroup';

const Empty = styled.div`
  background: khaki;
  height: 100%;
`;

@injectable()
class OENTools extends ToolGroup {
  tools = [];
  toolGroups = [];

  constructor(
    @inject('OENContainersToolGroup') OENContainersToolGroup,
    @inject('Display') display,
    @inject('Text') text,
    @inject('CustomTagBlockToolGroup') blockTag,
  ) {
    super();
    this.toolGroups = [
      {
        name: 'TabA',
        groups: [OENContainersToolGroup, display, text, blockTag],
      },
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;
    console.log(this._toolGroups[0]);
    const first = {
      id: '1',
      title: 'block level tools',
      icon: 'title',
      disabled: false,
      component: (
        <OENBlockLevelTools
          groups={this._toolGroups[0].groups.map(group => ({
            groupName:
              group.title === 'Custom Block'
                ? group.title
                : group.title.props.title,
            items: group._tools,
          }))}
          view={view}
        />
      ),
    };

    const second = {
      id: '2',
      disabled: true,
      title: 'chapter list',
      icon: 'chapterList',
      component: <Empty />,
    };

    const tabList = [first, second];

    const TabsComponent = useMemo(
      () => <Tabs key={uuidv4()} tabList={tabList} />,
      [],
    );
    return TabsComponent;
  }
}

export default OENTools;
