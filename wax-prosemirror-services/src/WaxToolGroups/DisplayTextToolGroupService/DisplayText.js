import React from 'react';
import { injectable, inject } from 'inversify';
import { BlockLevelTools, Tabs, ToolGroups } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

const Empty = styled.div`
  background: khaki;
  height: 100%;
`;

@injectable()
class DisplayText extends ToolGroup {
  tools = [];
  toolGroups = [];

  constructor(@inject('Display') display, @inject('Text') text) {
    super();
    this.toolGroups = [
      {
        name: 'TabA',
        groups: [display, text],
      },
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

    const first = {
      id: '1',
      icon: 'title',
      component: (
        <BlockLevelTools
          groups={this._toolGroups[0].groups.map(group => {
            console.log(group);
            return {
              groupName: group.title.props.title,
              items: group._tools,
            };
          })}
          view={view}
        />
      ),
    };

    const second = {
      id: '2',
      icon: 'code',
      component: <Empty />,
    };

    const tabList = [first, second];
    return <Tabs tabList={tabList} />;
  }
}

export default DisplayText;
