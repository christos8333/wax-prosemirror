/* eslint-disable no-param-reassign */
/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { TextSelection } from 'prosemirror-state';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { override } from '@pubsweet/ui-toolkit';
import CommentBox from './ui/comments/CommentBox';
import { AnnotationPluginKey } from '../plugins/AnnotationPlugin';

const ConnectedCommentStyled = styled.div`
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  transition: ${props =>
    props.active && props.length ? `none!important` : `all 1.3s`};
  position: absolute;
  width: 205px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }

  ${override('Wax.CommentOuterBox')}
`;

export default ({ comment, top, commentId, recalculateTops, users }) => {
  const context = useContext(WaxContext);
  const {
    pmViews,
    pmViews: {
      main: {
        props: { user },
      },
    },
    app,
    activeView,
    activeViewId,
    options: { comments },
  } = context;

  const [isActive, setIsActive] = useState(false);
  const [clickPost, setClickPost] = useState(false);

  const { state, dispatch } = activeView;
  const { viewId, conversation } = comment.data;
  const styles = {
    top: `${top}px`,
  };

  const commentConfig = app.config.get('config.CommentsService');
  const isReadOnly =
    commentConfig && commentConfig.readOnly ? commentConfig.readOnly : false;
  const showTitle =
    commentConfig && commentConfig.showTitle ? commentConfig.showTitle : false;
  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const activeComment = commentPlugin.getState(activeView.state).comment;

  useEffect(() => {
    setIsActive(false);
    recalculateTops();
    if (activeComment && commentId === activeComment.id) {
      setIsActive(true);
      recalculateTops();
    }
  }, [activeComment]);

  const onClickPost = ({ commentValue, title }) => {
    setClickPost(true);
    const currentUser = user || (users || []).find(u => u.currentUser === true);

    const obj = {
      content: commentValue,
      displayName: currentUser
        ? currentUser.displayName || currentUser.username
        : 'Anonymous',
      userId: currentUser ? currentUser.userId : '1',
      timestamp: Math.floor(Date.now()),
    };

    comment.data.title = title || comment.data.title;
    comment.data.conversation.push(obj);

    dispatch(
      state.tr.setMeta(AnnotationPluginKey, {
        type: 'updateComment',
        id: activeComment.id,
        data: comment.data,
      }),
    );
    activeView.focus();
    recalculateTops();
  };

  const onClickBox = () => {
    if (isActive) {
      pmViews[viewId].focus();
      return false;
    }

    if (viewId !== 'main') context.updateView({}, viewId);

    pmViews[viewId].dispatch(
      pmViews[viewId].state.tr.setSelection(
        new TextSelection(pmViews[viewId].state.tr.doc.resolve(comment.to - 1)),
      ),
    );

    pmViews[viewId].focus();
    return true;
  };

  const onClickResolve = () => {
    dispatch(
      state.tr.setMeta(AnnotationPluginKey, {
        type: 'deleteComment',
        id: activeComment.id,
      }),
    );
    recalculateTops();
    activeView.focus();
    setTimeout(() => {
      const newComments = comments.filter(comm => {
        return comm.id !== activeComment.id;
      });
      context.setOption({ comments: newComments });
    });
  };

  const onTextAreaBlur = () => {
    if (conversation.length === 0 && !clickPost) {
      onClickResolve();
      activeView.focus();
    }
  };

  const MemorizedComponent = useMemo(
    () => (
      <ConnectedCommentStyled
        active={isActive}
        data-box={commentId}
        length={conversation.length === 0}
        style={styles}
      >
        <CommentBox
          active={isActive}
          commentData={conversation}
          commentId={commentId}
          isReadOnly={isReadOnly}
          key={commentId}
          onClickBox={onClickBox}
          onClickPost={onClickPost}
          onClickResolve={onClickResolve}
          onTextAreaBlur={onTextAreaBlur}
          recalculateTops={recalculateTops}
          showTitle={showTitle}
          title={comment.data.title}
          users={users}
        />
      </ConnectedCommentStyled>
    ),
    [isActive, top, conversation.length, users],
  );
  return <>{MemorizedComponent}</>;
};
