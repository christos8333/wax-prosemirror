import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { InfoArea } from "wax-prosemirror-components";
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

const SideMenuContainer = styled.div`
  display: flex;
  width: 12%;
  height: 98%;
`;

const SideMenuInner = styled.div`
  display: flex;
  width: 100%;
  > div {
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
  }
`;

const EditoriaLayout = ({ editor, componentPlugin }) => {
  const LeftSideBar = componentPlugin("leftSideBar");
  const RightSideBar = componentPlugin("rightSideBar");
  const TopBar = componentPlugin("topBar");
  const BottomBar = componentPlugin("bottomBar");
  const EditorOverlays = componentPlugin("editorOverlays");
  return (
    <ThemeProvider theme={cokoTheme}>
      <LayoutWrapper>
        <MainMenuContainer>
          <MainMenuInner>
            <TopBar />
          </MainMenuInner>
        </MainMenuContainer>
        <WaxSurfaceContainer>
          <SideMenuContainer>
            <SideMenuInner>
              <LeftSideBar />
            </SideMenuInner>
          </SideMenuContainer>
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
};

export default EditoriaLayout;
