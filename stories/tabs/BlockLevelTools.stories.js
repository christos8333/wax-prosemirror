import React from 'react';

import BlockLevelTools from '../../wax-prosemirror-components/src/ui/tabs/BlockLevelTools';

const groups = [
  {
    groupName: 'Headings',
    items: [
      {
        content: 'Heading 1',
      },
      {
        content: 'Heading 2',
      },
    ],
  },

  {
    groupName: 'Titles',
    items: [
      {
        content: 'Title',
      },
      {
        content: 'Subtitle',
      },
    ],
  },
];

export const Base = () => <BlockLevelTools groups={groups} />;

export default {
  component: BlockLevelTools,
  title: 'Tabs/Block Level Tools',
};
