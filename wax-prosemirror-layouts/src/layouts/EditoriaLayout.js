import styled, { ThemeProvider } from "styled-components";
import React, { Fragment } from "react";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import EditorElements from "./EditorElements";
import { cokoTheme } from "wax-prosemirror-themes";

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

const WaxSurfaceScroll = styled.div`
  bottom: 0;
  left: 0;
  overflow: auto;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0;
  margin-left: 14%;
  padding: 2px;
  ${EditorElements};
`;

const EditoriaLayout = ({ editor, view, ...props }) => (
  <ThemeProvider theme={cokoTheme}>
    <LayoutWrapper>
      <MainMenuBar view={view} {...props} />
      <WaxSurfaceContainer>
        <SideMenuBar view={view} {...props} />
        <WaxSurfaceScroll>{editor}</WaxSurfaceScroll>
      </WaxSurfaceContainer>
    </LayoutWrapper>
  </ThemeProvider>
);

export default EditoriaLayout;
