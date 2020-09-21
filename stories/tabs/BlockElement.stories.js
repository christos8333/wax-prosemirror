import React from 'react';

import BlockElement from '../../wax-prosemirror-components/src/ui/tabs/BlockElement';

const item = {
  content: 'something',
};

export const Base = () => <BlockElement item={item} isNested={false} />;

export const Nested = () => <BlockElement item={item} isNested />;

export default {
  component: BlockElement,
  title: 'Tabs/Block Element',
};
