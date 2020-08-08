import React, { useState, useEffect, useContext, memo } from 'react';
import { TextSelection } from 'prosemirror-state';
import { last, maxBy } from 'lodash';

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
  console.log('rerender');
  const [animate, setAnimate] = useState(false);
  const {
    attrs: { id },
  } = comment;

  useEffect(() => {
    setAnimate(true);
  }, []);

  const MemorizedComponent = memo(() => {
    const {
      view,
      view: {
        main: {
          props: { user },
        },
      },
      app,
      activeView,
    } = useContext(WaxContext);
    let active = false;

    const commentPlugin = app.PmPlugins.get('commentPlugin');
    const activeComment = commentPlugin.getState(activeView.state).comment;

    if (activeComment && id === activeComment.attrs.id) active = true;

    const setCommentActive = () => {
      const viewId = comment.attrs.viewid;

      if (active) {
        view[viewId].focus();
        return false;
      }

      const allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(
        view[viewId].state,
        comment,
      );

      const maxPos = maxBy(allCommentsWithSameId, 'pos');
      maxPos.pos += last(allCommentsWithSameId).node.nodeSize;

      view[viewId].dispatch(
        view[viewId].state.tr.setSelection(
          new TextSelection(
            view[viewId].state.tr.doc.resolve(maxPos.pos, maxPos.pos),
          ),
        ),
      );

      view[viewId].focus();
    };

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
  });

  return <MemorizedComponent />;
};
