import React from 'react';
import styled from 'styled-components';
import { lorem } from 'faker';

import Tabs from '../../wax-prosemirror-components/src/ui/tabs/Tabs';

const Wrapper = styled.div`
  height: 400px;
`;

const One = styled.div`
  background: coral;
`;

const Two = styled.div`
  background: gold;
`;

const tabList = [
  {
    id: 1,
    displayName: 'One',
    component: <One>{lorem.sentences(8)}</One>,
  },
  {
    id: 2,
    displayName: 'Two',
    component: <Two>{lorem.sentences(8)}</Two>,
  },
];

export const Base = () => (
  <Wrapper>
    <Tabs tabList={tabList} />
  </Wrapper>
);

export default {
  component: Tabs,
  title: 'Tabs/Tabs',
};
