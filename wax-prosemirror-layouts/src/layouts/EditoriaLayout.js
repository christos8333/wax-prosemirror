import React, { useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import PanelGroup from 'react-panelgroup';
import { InfoArea } from 'wax-prosemirror-components';
import { componentPlugin } from 'wax-prosemirror-services';
import { cokoTheme } from 'wax-prosemirror-themes';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import EditorElements from './EditorElements';

const divider = css`
  .divider {
    &:before {
      content: 'Notes';
      position: relative;
      bottom: 14px;
      background: white;
      z-index: 999;
      color: #a3a3a3;
      font-weight: 600;
      letter-spacing: 0.15em;
    }
    &:after {
      color: #a3a3a3;
      content: '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . '
        '. . . . . . . . . . . . . . . . . . . . ';
      float: left;
      font-weight: 400;
      white-space: nowrap;
      width: 0;
      position: relative;
      bottom: 14px;
    }
  }
`;

const Wrapper = styled.div`
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
  justify-content: center;
  min-height: 40px;
  user-select: none;
  border-bottom: 2px solid #ecedf1;

  > div:not(:last-child) {
    border-right: 1px solid #ecedf1;
  }
`;

const SideMenu = styled.div`
  border-right: 1px solid #ecedf1;
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
  padding: 0 2px 2px 2px;
  height: 100%;

  ${EditorElements};
`;

const EditorContainer = styled.div`
  width: 65%;
  height: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 90%;
    padding: 40px;
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const NotesAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
`;

const NotesContainer = styled.div`
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px 5px;
  height: 100%;
  width: 65%;
  position: relative;
`;

let surfaceHeight = 700;
let notesHeight = 150;

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

const LeftSideBar = componentPlugin('leftSideBar');
// const RightSideBar = componentPlugin('rightSideBar');
const TopBar = componentPlugin('topBar');
const NotesArea = componentPlugin('notesArea');
const RightArea = componentPlugin('rightArea');
const WaxOverlays = componentPlugin('waxOverlays');

const EditoriaLayout = ({ editor }) => {
  const {
    view: { main },
  } = useContext(WaxContext);

  const notes = main && hasNotes(main);
  const showNotes = notes && notes.length && notes.length > 0;

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
                  <CommentsContainer>
                    <RightArea area="notes" />
                  </CommentsContainer>
                </NotesAreaContainer>
              )}
            </PanelGroup>
          </EditorArea>
        </Main>

        <InfoArea />
        <WaxOverlays />
      </Wrapper>
    </ThemeProvider>
  );
};

export default EditoriaLayout;
