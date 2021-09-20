import React, { useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import PanelGroup from 'react-panelgroup';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';
import { grid, th } from '@pubsweet/ui-toolkit';
import { cokoTheme } from '../theme';
import 'antd/dist/antd.css';
import EditorElements from './EditorElements';

/* Katex css */
import '~../../katex/dist/katex.min.css';

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: 100%;
  line-height: ${grid(4)};

  overflow: hidden;
  width: 100%;

  * {
    box-sizing: border-box;
  }
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 40px);
`;

const TopMenu = styled.div`
  background: ${th('colorBackgroundToolBar')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-top: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  min-height: 40px;
  user-select: none;

  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
  }

  > div:nth-last-of-type(-n + 2) {
    margin-left: auto;
  }

  > div:last-child {
    margin-left: 0;
    margin-right: ${grid(5)};
  }

  > div[data-name='Tables'] {
    border-right: none;
  }
`;

const EditorArea = styled.div`
  flex-grow: 1;
`;

const WaxSurfaceScroll = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  /* PM styles  for main content*/
  ${EditorElements};
`;

const EditorContainer = styled.div`
  height: 100%;
  width: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 98%;
    padding: ${grid(10)};
  }
`;

let surfaceHeight = (window.innerHeight / 5) * 3;
let notesHeight = (window.innerHeight / 5) * 2;

const onResizeEnd = arr => {
  surfaceHeight = arr[0].size;
  notesHeight = arr[1].size;
};

const MainMenuToolBar = ComponentPlugin('mainMenuToolBar');
const WaxOverlays = ComponentPlugin('waxOverlays');

const HhmiLayout = ({ editor }) => {
  const { options } = useContext(WaxContext);

  let fullScreenStyles = {};

  if (options.fullScreen) {
    fullScreenStyles = {
      backgroundColor: '#fff',
      height: '100%',
      left: '0',
      margin: '0',
      padding: '0',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: '99999',
    };
  }

  return (
    <ThemeProvider theme={cokoTheme}>
      <Wrapper style={fullScreenStyles} id="wax-container">
        <TopMenu>
          <MainMenuToolBar />
        </TopMenu>

        <Main>
          <EditorArea>
            <PanelGroup
              direction="column"
              panelWidths={[
                { size: surfaceHeight, resize: 'stretch' },
                { size: notesHeight, resize: 'resize' },
              ]}
              onResizeEnd={onResizeEnd}
            >
              <WaxSurfaceScroll>
                <EditorContainer>{editor}</EditorContainer>
              </WaxSurfaceScroll>
            </PanelGroup>
          </EditorArea>
        </Main>
        <WaxOverlays />
      </Wrapper>
    </ThemeProvider>
  );
};

export default HhmiLayout;
