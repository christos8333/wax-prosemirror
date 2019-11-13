import React from "react";
import styled from "styled-components";

import { forEach, map } from "lodash";
import MainMenuBarItems from "./MainMenuBarItems";

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

const filtered = (menu, menuItems) =>
  Object.keys(menu)
    .filter(key => menuItems.includes(key))
    .reduce((obj, key) => {
      obj[key] = menu[key];
      return obj;
    }, {});

const setMenuItems = (menu, menuItems) => {
  let items = menuItems;
  if (menuItems.length === 0) {
    forEach(menu, (key, index) => {
      items.push(index);
    });
  }
  return filtered(menu, items);
};

const MainMenuBar = ({
  menuItems = [],
  children,
  view,
  className,
  fileUpload
}) => (
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
