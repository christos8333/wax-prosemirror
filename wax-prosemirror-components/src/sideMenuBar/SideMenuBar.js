import React from "react";
import styled from "styled-components";
import { forEach, map } from "lodash";
import SideMenuItems from "./SideMenuItems";

const SideMenuContainer = styled.div`
  display: flex;
  width: 12%;
  height: 98%;
`;

const SideMenuInner = styled.div`
  display: flex;
  width: 100%;
`;

const SideMenu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 15px;
  button {
    display: flex;
    margin-left: 5%;
    flex-direction: column;
    width: 90%;
    background: transparent;
  }
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

const SideMenuBar = ({
  menuItems = [],
  children,
  view,
  className,
  fileUpload
}) => (
  <SideMenuContainer>
    <SideMenuInner>
      <SideMenu>
        {
          <span>
            {map(setMenuItems(SideMenuItems, menuItems), item =>
              item.menu({ view, item, fileUpload })
            )}
          </span>
        }
      </SideMenu>
    </SideMenuInner>
  </SideMenuContainer>
);

export default SideMenuBar;
