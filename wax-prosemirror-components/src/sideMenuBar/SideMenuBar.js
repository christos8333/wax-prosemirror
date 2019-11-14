import React from "react";
import styled from "styled-components";
import { map } from "lodash";
import SideMenuItems from "./SideMenuItems";
import { setMenuItems } from "../helpers";

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
    flex-direction: column;
    font-family: ${props => props.theme.fontInterface};
    margin-left: 5%;
    width: 90%;
  }
`;

const SideMenuBar = ({ menuItems = [], view, className }) => (
  <SideMenuContainer>
    <SideMenuInner>
      <SideMenu>
        {map(setMenuItems(SideMenuItems, menuItems), item =>
          item.menu({ view, item })
        )}
      </SideMenu>
    </SideMenuInner>
  </SideMenuContainer>
);

export default SideMenuBar;
