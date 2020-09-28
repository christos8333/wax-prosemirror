import React from 'react';

import BlockElementGroup from '../../wax-prosemirror-components/src/ui/tabs/BlockElementGroup';

const items = [
  {
    label: 'Heading 1',
  },
  {
    label: 'Heading 2',
  },
];

export const Base = () => (
  <BlockElementGroup groupName="Headings" items={items} />
);

export default {
  component: BlockElementGroup,
  title: 'Tabs/Block Element Group',
};
