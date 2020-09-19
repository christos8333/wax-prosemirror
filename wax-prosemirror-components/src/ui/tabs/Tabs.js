import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const activeTab = css`
  box-shadow: 0 0 3px blue;
`;

const Tab = styled.div`
  height: 50px;
  width: 50px;
  background: papayawhip;
  margin-bottom: 5px;
  cursor: pointer;

  ${props => props.active && activeTab}

  &:hover {
    background: gray;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
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
            {tab.displayName}
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
