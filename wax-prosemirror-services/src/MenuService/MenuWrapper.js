import React from 'react';
import styled from 'styled-components';

import { map } from 'lodash';

const MainMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 2px 2px 2px 0;
  position: relative;
`;

const MainMenuBar = ({ items = [], view }) => {
  return (
    <MainMenu key="MainMenu">
      {map(items, item => item.renderTools(view))}
    </MainMenu>
  );
};

export default MainMenuBar;
