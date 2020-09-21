import React from 'react';

import BlockElementGroup from '../../wax-prosemirror-components/src/ui/tabs/BlockElementGroup';

const items = [
  {
    content: 'Heading 1',
  },
  {
    content: 'Heading 2',
  },
];

export const Base = () => (
  <BlockElementGroup groupName="Headings" items={items} />
);

export default {
  component: BlockElementGroup,
  title: 'Tabs/Block Element Group',
};
