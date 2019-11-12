import styled, { ThemeProvider } from "styled-components";
import React, { Fragment } from "react";
import { MainMenuBar, SideMenuBar, InfoArea } from "wax-prosemirror-components";
import EditorElements from "./EditorElements";
import { cokoTheme } from "wax-prosemirror-themes";
import ComponentPlugins from "./ComponentPlugins";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WaxSurfaceContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WaxSurfaceScroll = styled.div`
  bottom: 0;
  left: 0;
  overflow: auto;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  margin-left: 14%;
  padding: 2px;
  height: 100%;
  ${EditorElements};
`;

const CommentsContainer = styled.div``;
const NotesContainer = styled.div``;

const EditoriaLayout = ({ editor, view, ...props }) => (
  <ThemeProvider theme={cokoTheme}>
    <LayoutWrapper>
      <MainMenuBar view={view} {...props} />
      <WaxSurfaceContainer>
        <SideMenuBar view={view} {...props} />
        <WaxSurfaceScroll className="wax-surface-scroll">
          {editor}
          <ComponentPlugins state={view.state} />
        </WaxSurfaceScroll>
      </WaxSurfaceContainer>
      <InfoArea />
    </LayoutWrapper>
  </ThemeProvider>
);

export default EditoriaLayout;
