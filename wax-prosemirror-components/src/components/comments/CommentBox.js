import React, { useState, useEffect, useContext } from 'react';
import { TextSelection } from 'prosemirror-state';

import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import Comment from './Comment';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const CommentBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid #ffab20;
  position: absolute;
  transition: ${({ state }) => 'top 1s, opacity 1.5s, left 1s'};
  top: ${props => (props.top ? `${props.top}px` : 0)};
  left: ${props => (props.active ? `${63}%` : `${65}%`)};
  opacity: ${({ state }) => {
    switch (state) {
      case 'exited':
        return 0.2;
      case 'exiting':
        return 0.4;
      case 'entering':
        return 0.6;
      case 'entered':
        return 1;
    }
  }};
`;

export default ({ comment, top, dataBox }) => {
  const {
    view,
    view: {
      main: {
        props: { user },
      },
    },
    app,
    activeView,
    activeViewId,
  } = useContext(WaxContext);

  const [animate, setAnimate] = useState(false);
  const {
    attrs: { id },
  } = comment;
  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const activeComment = commentPlugin.getState(activeView.state).comment;

  const setCommentActive = () => {
    let commentPos = comment.pos + 1;
    console.log(comment);
    if (comment.attrs.group !== 'main') {
      // const allInlineNodes = DocumentHelpers.findInlineNodes(activeView.state.doc);

      allInlineNodes.forEach(node => {
        console.log(node);
      });
    }

    // activeView.dispatch(
    //   activeView.state.tr.setSelection(
    //     new TextSelection(
    //       activeView.state.tr.doc.resolve(comment.pos + 1, comment.pos + 1),
    //     ),
    //   ),
    // );
    // let $pos = activeView.state.tr.doc.resolve(comment.pos);
    // let parent = $pos.parent;
    // let start = parent.childAfter($pos.parentOffset);
    // if (!start.node) return null;
    // let link = start.node.marks.find(mark => mark.type.name == 'comment');
    // let startIndex = $pos.index();
    // let startPos = $pos.start() + start.offset;
    // while (startIndex > 0 && link.isInSet(parent.child(startIndex - 1).marks))
    //   startPos -= parent.child(--startIndex).nodeSize;
    // let endIndex = $pos.indexAfter(),
    //   endPos = startPos + start.node.nodeSize;
    // while (
    //   endPos < parent.childCount &&
    //   link.isInSet(parent.child(endIndex).marks)
    // )
    //   endPos += parent.child(endIndex++).nodeSize;
    // // return { from: startPos, to: endPos };
    // console.log('comment', $pos);
    // activeView.focus();
  };

  let active = false;
  if (activeComment && id === activeComment.attrs.id) active = true;
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <Transition in={animate} timeout={1000}>
        {state => (
          <CommentBoxStyled
            top={top}
            state={state}
            data-box={dataBox}
            active={active}
            onClick={setCommentActive}
          >
            <Comment
              comment={comment}
              active={active}
              activeView={activeView}
              user={user}
            />
          </CommentBoxStyled>
        )}
      </Transition>
    </>
  );
};
