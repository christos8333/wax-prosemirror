/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { th } from '@pubsweet/ui-toolkit';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Icon from '../icons/Icon';
import CustomTagBlockComponent from './CustomTagBlockComponent';
import OENToolGroup from './OENToolGroup';
import BlockElement from './BlockElement';

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

  const { t, i18n } = useTranslation();

  const translatedLabel = (translation, defaultLabel) => {
    return !isEmpty(i18n) && i18n.exists(translation)
      ? t(translation)
      : defaultLabel;
  };

  return (
    <>
      {groupName !== 'Custom Block' && groupName !== 'OEN Containers' && (
        <>
          <GroupName>
            {translatedLabel(`Wax.Various.${groupName}`, groupName)}
          </GroupName>
          <ListWrapper>
            {items &&
              items.map(item => (
                <BlockElement item={item} key={item.name} view={view} />
              ))}
          </ListWrapper>
        </>
      )}

      {groupName === 'OEN Containers' && (
        <OENToolGroup item={items[0]} key="oen" view={view} />
      )}

      {groupName === 'Custom Block' && (
        <>
          <FlexDiv>
            <GroupName>
              {translatedLabel(`Wax.Various.${groupName}`, groupName)}
            </GroupName>
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
