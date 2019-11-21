import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { InfoArea, componentPlugin } from "wax-prosemirror-components";
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

const LeftSideBar = componentPlugin("leftSideBar");
const RightSideBar = componentPlugin("rightSideBar");
const TopBar = componentPlugin("topBar");
const BottomBar = componentPlugin("bottomBar");
const EditorOverlays = componentPlugin("editorOverlays");

const EditoriaLayout = ({ editor }) => (
  <ThemeProvider theme={cokoTheme}>
    <LayoutWrapper>
      <TopBar />
      <WaxSurfaceContainer>
        <LeftSideBar />
        <WaxSurfaceScroll className="wax-surface-scroll">
          {editor}
          <EditorOverlays />
        </WaxSurfaceScroll>
        <RightSideBar />
      </WaxSurfaceContainer>
      <BottomBar />
      <InfoArea />
    </LayoutWrapper>
  </ThemeProvider>
);

export default EditoriaLayout;
