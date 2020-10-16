import React, { useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import PanelGroup from 'react-panelgroup';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';
import { grid, th } from '@pubsweet/ui-toolkit';

import { cokoTheme } from '../theme';
import EditorElements from './EditorElements';

/* Katex css */
import '~../../katex/dist/katex.min.css';

const divider = css`
  .panelGroup {
    background: ${th('colorBackgroundHue')};
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
  min-height: 40px;
  user-select: none;
  background: ${th('colorBackgroundToolBar')}
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};

  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
  }

  > div:last-child {
    margin-left: auto;
    margin-right: 10px;
  }
  > div[data-name="Tables"]{
    border-right: none;
  }
`;

const SideMenu = styled.div`
  background: ${th('colorBackgroundToolBar')}
  border-right: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  min-width: 250px;
  height: 100%;
`;

const EditorArea = styled.div`
  flex-grow: 1;
`;

const WaxSurfaceScroll = styled.div`
  overflow-y: auto;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: absolute;
  /* PM styles  for main content*/
  ${EditorElements};
`;

const EditorContainer = styled.div`
  width: 65%;
  height: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 90%;
    padding: ${grid(10)};
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const CommentsContainerNotes = styled.div`
  background: ${th('colorBackgroundHue')};
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const NotesAreaContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  /* PM styles  for note content*/
  ${EditorElements};
  .ProseMirror {
    display: inline;
  }
`;

const NotesContainer = styled.div`
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding-bottom: ${grid(4)};
  height: 100%;
  width: 65%;
`;

let surfaceHeight = 600;
let notesHeight = 200;

const onResizeEnd = arr => {
  surfaceHeight = arr[0].size;
  notesHeight = arr[1].size;
};

const hasNotes = main => {
  const notes = DocumentHelpers.findChildrenByType(
    main.state.doc,
    main.state.schema.nodes.footnote,
    true,
  );
  return notes;
};

const LeftSideBar = ComponentPlugin('leftSideBar');
const TopBar = ComponentPlugin('topBar');
const NotesArea = ComponentPlugin('notesArea');
const RightArea = ComponentPlugin('rightArea');
const WaxOverlays = ComponentPlugin('waxOverlays');

const EditoriaLayout = ({ editor }) => {
  const {
    view: { main },
  } = useContext(WaxContext);

  const notes = main && hasNotes(main);
  const showNotes = notes && !!notes.length && notes.length > 0;

  return (
    <ThemeProvider theme={cokoTheme}>
      <Wrapper>
        <TopMenu>
          <TopBar />
        </TopMenu>

        <Main>
          <SideMenu>
            <LeftSideBar />
          </SideMenu>

          <EditorArea>
            <PanelGroup
              direction="column"
              panelWidths={[
                { size: surfaceHeight, resize: 'stretch' },
                { size: notesHeight, resize: 'stretch' },
              ]}
              onResizeEnd={onResizeEnd}
            >
              <WaxSurfaceScroll>
                <EditorContainer>{editor}</EditorContainer>
                <CommentsContainer>
                  <RightArea area="main" />
                </CommentsContainer>
              </WaxSurfaceScroll>

              {showNotes && (
                <NotesAreaContainer>
                  <NotesContainer id="notes-container">
                    <NotesArea />
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
      </Wrapper>
    </ThemeProvider>
  );
};

export default EditoriaLayout;
