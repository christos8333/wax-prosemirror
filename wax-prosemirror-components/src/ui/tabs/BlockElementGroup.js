import React from 'react';
import styled from 'styled-components';

import BlockElement from './BlockElement';

const Wrapper = styled.div``;

const GroupName = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  text-transform: uppercase;
`;

const ListWrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const BlockElementGroup = props => {
  const { groupName, items, view } = props;

  return (
    <Wrapper>
      <GroupName>{groupName}</GroupName>

      <ListWrapper>
        {items &&
          items.map(item => (
            <BlockElement key={item.name} item={item} view={view} />
          ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default BlockElementGroup;
