import styled from "styled-components";
import React, { Fragment } from "react";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import EditorElements from "./EditorElements";

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
  .ProseMirror {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
    width: 65%;
    min-height: 90%;
    padding: 40px;
    &:focus {
      outline: none;
    }
    ${EditorElements};
  }
`;

const EditoriaLayout = ({ editor, view, ...props }) => (
  <LayoutWrapper>
    <MainMenuBar view={view} {...props} />
    <WaxSurfaceContainer>
      <SideMenuBar view={view} {...props} />
      <WaxSurfaceScroll>{editor}</WaxSurfaceScroll>
    </WaxSurfaceContainer>
  </LayoutWrapper>
);

export default EditoriaLayout;
