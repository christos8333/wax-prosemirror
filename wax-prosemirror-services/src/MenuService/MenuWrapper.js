import React from "react";
import styled from "styled-components";
import { useContext } from "react";

import { map } from "lodash";

const MainMenu = styled.div`
  background: #fff;
  padding: 2px 2px 2px 0;
  position: relative;
  background: transparent;
`;

const MainMenuBar = ({ items = [], view }) => (
  <MainMenu key="MainMenu">
    {map(items, item => item.renderTools(view))}
  </MainMenu>
);

export default MainMenuBar;
