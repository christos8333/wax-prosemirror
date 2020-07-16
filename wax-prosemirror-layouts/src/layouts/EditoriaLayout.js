import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PanelGroup from 'react-panelgroup';
import { InfoArea } from 'wax-prosemirror-components';
import { componentPlugin } from 'wax-prosemirror-services';
import { cokoTheme } from 'wax-prosemirror-themes';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import EditorElements from './EditorElements';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .divider {
    &:before {
      content: 'Notes';
      position: relative;
      bottom: 14px;
      background: white;
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

const LeftMenuSurfaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const WaxSurfaceContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const EditorContainer = styled.div`
  width: 65%;
  height: 100%;
  .ProseMirror {
    -moz-box-shadow: 0 0 8px #ecedf1;
    -webkit-box-shadow: 0 0 8px #ecedf1;
    box-shadow: 0 0 8px #ecedf1;
    min-height: 90%;
    padding: 40px;
  }
`;

const WaxSurfaceScroll = styled.div`
  bottom: 0;
  left: 0;
  overflow: auto;
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0 2px 2px 2px;
  height: 100%;
  ${EditorElements};
`;

const MainMenuContainer = styled.div`
  background: #fff;
  height: 52px;
  line-height: 32px;
  position: relative;
  user-select: none;
  border-bottom: 2px solid #ecedf1;
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
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SideMenuContainer = styled.div`
  display: flex;
  width: 14%;
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
    [data-name='Display'] {
      border-right: none;
    }
  }
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

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

let surfaceHeight = 700;
let notesHeight = 50;

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
const RightSideBar = componentPlugin('rightSideBar');
const TopBar = componentPlugin('topBar');
const NotesArea = componentPlugin('notesArea');
const RightArea = componentPlugin('rightArea');
const WaxOverlays = componentPlugin('waxOverlays');

const withNotes = () => {
  return (
    <NotesAreaContainer>
      <NotesContainer id="notes-container">
        <NotesArea />
      </NotesContainer>
      <CommentsContainer>
        <RightArea area="notes" />
      </CommentsContainer>
    </NotesAreaContainer>
  );
};

const EditoriaLayout = ({ editor }) => {
  const {
    view: { main },
  } = useContext(WaxContext);
  let AreasWithNotes = null;

  if (main) {
    const notes = hasNotes(main);
    if (notes.length) AreasWithNotes = withNotes();
  }

  return (
    <ThemeProvider theme={cokoTheme}>
      <LayoutWrapper>
        <MainMenuContainer>
          <MainMenuInner>
            <TopBar />
          </MainMenuInner>
        </MainMenuContainer>

        <LeftMenuSurfaceContainer>
          <SideMenuContainer>
            <SideMenuInner>
              <LeftSideBar />
            </SideMenuInner>
          </SideMenuContainer>

          <PanelGroup
            direction="column"
            panelWidths={[
              { size: surfaceHeight, resize: 'dynamic' },
              { size: notesHeight, resize: 'stretch' },
            ]}
            onResizeEnd={onResizeEnd}
          >
            <WaxSurfaceContainer>
              <WaxSurfaceScroll className="wax-surface-scroll">
                <EditorContainer>{editor}</EditorContainer>
                <CommentsContainer>
                  <RightArea area="main" />
                </CommentsContainer>
              </WaxSurfaceScroll>
              <RightSideBar />
            </WaxSurfaceContainer>
            {AreasWithNotes}
          </PanelGroup>
        </LeftMenuSurfaceContainer>
        <InfoArea />
        <WaxOverlays />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default EditoriaLayout;
