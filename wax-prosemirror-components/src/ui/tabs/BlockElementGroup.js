import React from 'react';
import styled from 'styled-components';

import BlockElement from './BlockElement';

const Wrapper = styled.div``;
const GroupName = styled.div``;

const BlockElementGroup = props => {
  const { groupName, items } = props;

  return (
    <Wrapper>
      <GroupName>{groupName}</GroupName>
      {items && items.map(item => <BlockElement item={item} />)}
    </Wrapper>
  );
};

export default BlockElementGroup;
