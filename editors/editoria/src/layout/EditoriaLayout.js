import React, { useContext, useState, useCallback, useEffect } from 'react';
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
  min-height: 40px;
  user-select: none;
  background: ${th('colorBackgroundToolBar')}
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};

  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
  }


  > div:nth-last-of-type(-n+2) {
    margin-left: auto;
  }

  > div:last-child {
    margin-left: 0;
    margin-right: ${grid(5)};
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
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const CommentTrackTools = styled.div`
  padding: ${grid(2)}0 0 0;
  position: fixed;
  display: flex;
  margin-left: 5px;
  z-index: 1;
  height: 30px;
  width: 29.4%;
  background: #fff;
  span {
    margin-left: auto;
  }
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
  box-shadow: 0 0 8px #ecedf1;
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding-bottom: ${grid(4)};
  height: 100%;
  width: 65%;
`;
const WaxBottomRightInfo = styled.div``;
const InfoContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 1px;
  right: 21px;
  z-index: 999;
`;

let surfaceHeight = 600;
let notesHeight = 200;

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

const getCommentsTracks = main => {
  const marks = DocumentHelpers.findInlineNodes(main.state.doc);
  const commentsTracks = [];
  marks.map(node => {
    if (node.node.marks.length > 0) {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === 'comment' ||
          mark.type.name === 'insertion' ||
          mark.type.name === 'deletion' ||
          mark.type.name === 'format_change'
        ) {
          mark.pos = node.pos;
          commentsTracks.push(mark);
        }
      });
    }
  });
  return commentsTracks;
};

const LeftSideBar = ComponentPlugin('leftSideBar');
const MainMenuToolBar = ComponentPlugin('mainMenuToolBar');
const NotesArea = ComponentPlugin('notesArea');
const RightArea = ComponentPlugin('rightArea');
const CommentTrackToolBar = ComponentPlugin('commentTrackToolBar');
const WaxOverlays = ComponentPlugin('waxOverlays');
const BottomRightInfo = ComponentPlugin('BottomRightInfo');

const EditoriaLayout = ({ editor }) => {
  const {
    view: { main },
    options,
  } = useContext(WaxContext);

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
  const notes = main && getNotes(main);
  const commentsTracks = main && getCommentsTracks(main).length;
  console.log('comments', commentsTracks);
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
      <Wrapper style={fullScreenStyles}>
        <TopMenu>
          <MainMenuToolBar />
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
                { size: notesHeight, resize: 'resize' },
              ]}
              onResizeEnd={onResizeEnd}
            >
              <WaxSurfaceScroll>
                <EditorContainer>{editor}</EditorContainer>
                <CommentsContainer>
                  <CommentTrackTools>
                    <span>
                      {commentsTracks} COMMENTS AND SUGGESTIONS
                      <CommentTrackToolBar />
                    </span>
                  </CommentTrackTools>
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
