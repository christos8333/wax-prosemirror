import React, { useContext, useState, useCallback, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import PanelGroup from 'react-panelgroup';
import {
  WaxContext,
  ComponentPlugin,
  DocumentHelpers,
} from 'wax-prosemirror-core';

import { grid, th } from '@pubsweet/ui-toolkit';
import { cokoTheme } from '../theme';
import EditorElements from './EditorElements';

const divider = css`
  .panelGroup {
    background: #fff;
  }
  .divider {
    > div {
      background: ${th('colorBorder')};
      height: ${grid(1)};
      max-height: ${grid(1)};

      &:hover {
        height: ${grid(2)};
        max-height: ${grid(2)};
      }
    }
  }
`;

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  overflow: hidden;

  ${divider}
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
`;

const TopMenu = styled.div`
  display: flex;
  height: 70px;
  padding-top: 10px;
  flex-wrap: wrap;
  font-size:8px;
  position:absolute;
  z-index: 999;
  top: 0;
  bottom:0;
  user-select: none;
  background: ${th('colorBackgroundToolBar')}
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  > div {
    height: 20px;
  }
  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorBorder')};
  }
  button: {
    height: 20px;
  }
  svg {
    width: 14px;
    height: 14px;
  }
  div:last-child{
      button span {
        font-size: 10px;
        margin: 0;
      }
  }
`;

const EditorArea = styled.div`
  flex-grow: 1;
`;

const WaxSurfaceScroll = styled.div`
  overflow-y: auto;
  overflow-x: scroll;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 96%;
  position: absolute;
  /* PM styles  for main content*/
  ${EditorElements};
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 90%;
    padding: ${grid(25)} ${grid(2)} ${grid(40)} ${grid(2)};
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CommentsContainerNotes = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NotesAreaContainer = styled.div`
  box-shadow: 0 0 8px #ecedf1;
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  /* PM styles  for note content*/
  ${EditorElements};
`;

const NotesContainer = styled.div`
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding-bottom: ${grid(4)};
  height: 100%;
  width: 96%;
  > div {
    padding-left: ${grid(1)};
    padding-right: ${grid(1)};
  }
`;
const WaxBottomRightInfo = styled.div``;
const InfoContainer = styled.div`
  display: flex;
  position: fixed !important;
  bottom: 1px;
  right: 21px;
  z-index: 1;
`;

let surfaceHeight = 500;
let notesHeight = 150;

const onResizeEnd = arr => {
  surfaceHeight = arr[0].size;
  notesHeight = arr[1].size;
};

const getNotes = main => {
  const notes = DocumentHelpers.findChildrenByType(
    main.state.doc,
    main.state.schema.nodes.footnote,
    true,
  );
  return notes;
};

const TopBar = ComponentPlugin('topBar');
const NotesArea = ComponentPlugin('notesArea');
const RightArea = ComponentPlugin('rightArea');
const WaxOverlays = ComponentPlugin('waxOverlays');
const BottomRightInfo = ComponentPlugin('BottomRightInfo');

const EditoriaLayout = ({ editor }) => {
  const {
    pmViews: { main },
  } = useContext(WaxContext);

  const notes = main && getNotes(main);
  const areNotes = notes && !!notes.length && notes.length > 0;

  const [hasNotes, setHasNotes] = useState(areNotes);

  const showNotes = () => {
    setHasNotes(areNotes);
  };

  const delayedShowedNotes = useCallback(
    setTimeout(() => showNotes(), 100),
    [],
  );

  useEffect(() => {}, [delayedShowedNotes]);

  return (
    <ThemeProvider theme={cokoTheme}>
      <Wrapper id="wax-container">
        <TopMenu>
          <TopBar />
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
                <CommentsContainer>
                  <RightArea area="main" />
                </CommentsContainer>
              </WaxSurfaceScroll>

              {hasNotes && (
                <NotesAreaContainer>
                  <NotesContainer id="notes-container">
                    <NotesArea view={main} />
                  </NotesContainer>
                  <CommentsContainerNotes>
                    <RightArea area="notes" />
                  </CommentsContainerNotes>
                </NotesAreaContainer>
              )}
            </PanelGroup>
          </EditorArea>
        </Main>

        <WaxOverlays />
        <WaxBottomRightInfo>
          <InfoContainer id="info-container">
            <BottomRightInfo />
          </InfoContainer>
        </WaxBottomRightInfo>
      </Wrapper>
    </ThemeProvider>
  );
};

export default EditoriaLayout;
