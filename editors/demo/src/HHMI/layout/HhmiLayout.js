import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { WaxContext, ComponentPlugin, WaxView } from 'wax-prosemirror-core';
import { grid, th } from '@pubsweet/ui-toolkit';
import { cokoTheme } from '../theme';
import EditorElements from './EditorElements';

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

  > div:last-child {
    border-left: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
    margin-left: auto;
    margin-right: ${grid(5)};
  }

  > div[data-name='Matching'] {
    border-right: none;
  }
`;

const EditorArea = styled.div`
  background: #f4f4f7;
  flex-grow: 1;
`;

const WaxSurfaceScroll = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow-y: auto;
  padding: 25px 25% 0 25%;
  position: relative;
  width: 100%;

  /* PM styles  for main content*/
  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${EditorElements};
`;

const EditorContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 100%;
    padding: ${grid(10)};
  }
`;

const MainMenuToolBar = ComponentPlugin('mainMenuToolBar');

const HhmiLayout = props => {
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
        <TopMenu role="menu">
          <MainMenuToolBar />
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
};

export default HhmiLayout;
