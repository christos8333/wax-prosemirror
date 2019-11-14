import React from "react";
import styled from "styled-components";

import { map } from "lodash";
import MainMenuBarItems from "./MainMenuBarItems";
import { setMenuItems } from "../helpers";

const MainMenuContainer = styled.div`
  background: #fff;
  height: 52px;
  line-height: 32px;
  position: relative;
  user-select: none;
`;
const MainMenuInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
  z-index: 9999;
`;
const MainMenu = styled.div`
  background: #fff;
  padding: 2px 2px 2px 0;
  position: relative;
  background: transparent;
`;

const MainMenuBar = ({ menuItems = [], view, className, fileUpload }) => (
  <MainMenuContainer>
    <MainMenuInner>
      <MainMenu>
        {map(setMenuItems(MainMenuBarItems, menuItems), item =>
          item.menu({ view, item, fileUpload })
        )}
      </MainMenu>
    </MainMenuInner>
  </MainMenuContainer>
);

export default MainMenuBar;
