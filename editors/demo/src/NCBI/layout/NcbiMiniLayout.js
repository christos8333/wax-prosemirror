import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ComponentPlugin, WaxView } from 'wax-prosemirror-core';
import { cokoTheme } from '../theme';
import { grid, th } from '@pubsweet/ui-toolkit';
import EditorMiniElements from './EditorMiniElements';

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  border: 1px solid grey;
  clear: both;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  width: 100%;
`;

const Main = styled.div`
  display: flex;
`;

const TopMenu = styled.div`
  background: #fff;
  display: inline-flex;
  height: 32px;
  margin-right: 1px;
  user-select: none;
  width: 498px;
  z-index: 999;

  > div:not(:last-child) {
    border: none;
    ${th('colorFurniture')};
  }
`;

const EditorArea = styled.div`
  flex-grow: 1;
  max-height: 400px;
`;

const WaxSurfaceScroll = styled.div`
  border: none;
  box-sizing: border-box;
  display: flex;
  overflow-y: auto;
  max-height: 400px;
  position: relative;
  width: 100%;
  /* PM styles  for main content*/

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${EditorMiniElements}
`;

const EditorContainer = styled.div`
  height: 100%;
  width: 100%;
  max-height: 400px;

  .ProseMirror {
    border-top: none;
    margin-right: ${grid(1)};
    padding: ${grid(1)};
  }
`;

const TopBar = ComponentPlugin('topBar');

const NcbiLayout = props => (
  <ThemeProvider theme={cokoTheme}>
    <Wrapper>
      <TopMenu>
        <TopBar />
      </TopMenu>
      <Main>
        <EditorArea>
          <WaxSurfaceScroll>
            <EditorContainer>
              <WaxView {...props} />
            </EditorContainer>
          </WaxSurfaceScroll>
        </EditorArea>
      </Main>
    </Wrapper>
  </ThemeProvider>
);

export default NcbiLayout;
