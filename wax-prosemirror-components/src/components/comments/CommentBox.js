import React, { useState, useEffect, useContext } from 'react';
import { TextSelection } from 'prosemirror-state';
import { last } from 'lodash';

import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import Comment from './Comment';

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

  let active = false;
  if (activeComment && id === activeComment.attrs.id) active = true;
  useEffect(() => {
    setAnimate(true);
  }, []);

  const setCommentActive = () => {
    const viewId = comment.attrs.viewid;
    let maxPos = comment.pos;
    const allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(view[viewId].state, comment);

    allCommentsWithSameId.forEach(singleComment => {
      const markPosition = DocumentHelpers.findMarkPosition(view[viewId], singleComment.pos, 'comment');
      if (markPosition.to > maxPos) maxPos = markPosition.to;
    });

    if (!active && allCommentsWithSameId.length > 1) maxPos += last(allCommentsWithSameId).node.nodeSize;

    view[viewId].dispatch(
      view[viewId].state.tr.setSelection(new TextSelection(view[viewId].state.tr.doc.resolve(maxPos, maxPos))),
    );

    view[viewId].focus();
  };

  return (
    <>
      <Transition in={animate} timeout={1000}>
        {state => (
          <CommentBoxStyled top={top} state={state} data-box={dataBox} active={active} onClick={setCommentActive}>
            <Comment comment={comment} active={active} activeView={activeView} user={user} />
          </CommentBoxStyled>
        )}
      </Transition>
    </>
  );
};
