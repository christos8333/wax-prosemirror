/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { th } from '@pubsweet/ui-toolkit';
import styled from 'styled-components';
import CustomTagBlockComponent from '../customtag/CustomTagBlockComponent';
import BlockElement from '../../ui/tabs/BlockElement';
import Icon from '../../helpers/Icon';

const GroupName = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const ListWrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  fill: ${th('colorPrimary')};
  height: 14px;
  width: 14px;
`;

const BlockElementGroup = ({ groupName, items, view }) => {
  const [isIconClicked, setIconClicked] = useState(false);

  const onIconClick = () => {
    setIconClicked(!isIconClicked);
  };

  return (
    <>
      {groupName !== 'Custom Block' && (
        <>
          <GroupName>{groupName}</GroupName>
          <ListWrapper>
            {items &&
              items.map(item => (
                <BlockElement item={item} key={item.name} view={view} />
              ))}
          </ListWrapper>
        </>
      )}

      {groupName === 'Custom Block' && (
        <>
          <FlexDiv>
            <GroupName>{groupName}</GroupName>
            <div aria-hidden="true" onClick={onIconClick}>
              {!isIconClicked && <StyledIcon name="IconCross" />}
              {isIconClicked && <StyledIcon name="IconMinus" />}
            </div>
          </FlexDiv>
          <ListWrapper>
            <CustomTagBlockComponent
              isShowTag={isIconClicked}
              item={items[0]}
              view={view}
            />
          </ListWrapper>
        </>
      )}
    </>
  );
};

export default BlockElementGroup;
