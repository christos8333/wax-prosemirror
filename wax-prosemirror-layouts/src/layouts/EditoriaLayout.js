import styled from "styled-components";
import React, { Fragment } from "react";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WaxSurfaceContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const EditoriaLayout = ({ editor, view, ...props }) => (
  <LayoutWrapper>
    <MainMenuBar view={view} {...props} />
    <WaxSurfaceContainer>
      <SideMenuBar view={view} {...props} />
      {editor}
    </WaxSurfaceContainer>
  </LayoutWrapper>
);

export default EditoriaLayout;
