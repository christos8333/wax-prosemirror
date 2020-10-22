import React, { useState } from 'react';
import { th } from '@pubsweet/ui-toolkit';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  background: #e3e3e3;
`;

const activeTab = css`
  box-shadow: 0 0 3px ${th('colorPrimary')};
`;

const Tab = styled.div`
  background: gainsboro;
  padding: 8px;
  margin: 0 4px 4px 4px;
  cursor: pointer;

  &:first-child {
    margin-top: 4px;
  }

  ${props => props.active && activeTab}

  &:hover {
    background: silver;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
`;

const TabsPane = props => {
  const { tabList } = props;
  if (!tabList || tabList.length === 0) return null;

  const [tabDisplay, setTabDisplay] = useState(tabList[0].id);

  return (
    <Wrapper>
      <Tabs>
        {tabList.map(tab => (
          <Tab
            active={tabDisplay === tab.id}
            key={tab.id}
            onClick={() => setTabDisplay(tab.id)}
          >
            <Icon name={tab.icon} />
          </Tab>
        ))}
      </Tabs>

      <Content>{tabList.find(tab => tabDisplay === tab.id).component}</Content>
    </Wrapper>
  );
};

TabsPane.propTypes = {
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
      component: PropTypes.node,
    }),
  ).isRequired,
};

export default TabsPane;
