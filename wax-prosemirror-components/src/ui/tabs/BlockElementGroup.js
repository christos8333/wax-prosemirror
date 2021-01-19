import React, { useState } from 'react';
import styled from 'styled-components';
import CustomTagBlockComponent from '../../components/customtag/CustomTagBlockComponent';
import BlockElement from './BlockElement';
import { th } from '@pubsweet/ui-toolkit';

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

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconPlusSVG = props => {
  const { className } = props;
  return (
    <svg className={className} viewBox="0 0 426.66667 426.66667" fill="none">
      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
    </svg>
  );
};


const Icon = styled(IconPlusSVG)`
  height: 10px;
  width: 10px;
  fill: ${th('colorPrimary')};
  cursor: pointer;
`;

const IconCrossSVG = props => {
  const { className } = props;
  return (
    <svg className={className} viewBox="0 0 409.6 409.6" fill="none" >
      <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467
  c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z"/>
    </svg>
  );
};

const IconCross = styled(IconCrossSVG)`
  height: 10px;
  width: 10px;
  fill: ${th('colorPrimary')};
  cursor: pointer;
`;


const BlockElementGroup = props => {
  const { groupName, items, view } = props;
  const [isIconClicked, setIconClicked] = useState(false);

  const onIconClick = () => {
    setIconClicked(isIconClicked === true ? false : true);
  }


  return (
    <Wrapper>
      {groupName !== "Custom Block" && <>
        <GroupName>{groupName}</GroupName>
        <ListWrapper>
          {items &&
            items.map(item => (
              <BlockElement key={item.name} item={item} view={view} />
            ))}
        </ListWrapper></>}

      {groupName === "Custom Block" && <>
        <FlexDiv>
          <GroupName>{groupName}</GroupName>
          <div onClick={onIconClick}>
            {isIconClicked === false && <Icon />}
            {isIconClicked === true && <IconCross />}
          </div>
        </FlexDiv>
        <ListWrapper>
          <CustomTagBlockComponent isShowTag={isIconClicked} view={view}  />
        </ListWrapper>
      </>}

    </Wrapper>
  );
};

export default BlockElementGroup;
