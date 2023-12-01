/* eslint-disable no-param-reassign */
/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { TextSelection } from 'prosemirror-state';
import { last, maxBy } from 'lodash';
import styled from 'styled-components';
import { WaxContext, DocumentHelpers, Commands } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import { override } from '@pubsweet/ui-toolkit';
import CommentBox from './ui/comments/CommentBox';

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
  } = context;

  const [isActive, setIsActive] = useState(false);
  const [clickPost, setClickPost] = useState(false);

  const { state, dispatch } = activeView;
  const viewId = comment.attrs.viewid;
  let allCommentsWithSameId = [];

  if (pmViews[viewId]) {
    allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(
      pmViews[viewId].state,
      comment,
    );
  }
  const commentMark = state.schema.marks.comment;

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
    if (activeComment && commentId === activeComment.attrs.id) {
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

    comment.attrs.title = title || comment.attrs.title;
    comment.attrs.conversation.push(obj);

    const id = uuidv4();
    allCommentsWithSameId.forEach(singleComment => {
      activeView.dispatch(
        activeView.state.tr.removeMark(
          singleComment.pos,
          singleComment.pos + singleComment.node.nodeSize,
          commentMark,
        ),
      );

      if (activeViewId !== 'main') {
        activeView.dispatch(
          activeView.state.tr
            .addMark(
              singleComment.pos,
              singleComment.pos + singleComment.node.nodeSize,
              commentMark.create({
                id,
                group: comment.attrs.group,
                viewid: comment.attrs.viewid,
                conversation: comment.attrs.conversation,
                title: comment.attrs.title,
              }),
            )
            .setMeta('forceUpdate', true),
        );
      }
    });

    if (activeViewId === 'main') {
      Commands.createComment(
        pmViews.main.state,
        pmViews.main.dispatch,
        comment.attrs.group,
        comment.attrs.viewid,
        comment.attrs.conversation,
      );
    }
    activeView.focus();
    recalculateTops();
  };

  const onClickBox = () => {
    if (isActive) {
      pmViews[viewId].focus();
      return false;
    }

    if (viewId !== 'main') context.updateView({}, viewId);

    const maxPos = maxBy(allCommentsWithSameId, 'pos');
    maxPos.pos += last(allCommentsWithSameId).node.nodeSize;

    pmViews[viewId].dispatch(
      pmViews[viewId].state.tr.setSelection(
        new TextSelection(pmViews[viewId].state.tr.doc.resolve(maxPos.pos)),
      ),
    );

    pmViews[viewId].focus();
    return true;
  };

  const onClickResolve = () => {
    let maxPos = comment.pos;
    let minPos = comment.pos;

    allCommentsWithSameId.forEach(singleComment => {
      const markPosition = DocumentHelpers.findMarkPosition(
        state,
        singleComment.pos,
        'comment',
      );
      if (markPosition.from < minPos) minPos = markPosition.from;
      if (markPosition.to > maxPos) maxPos = markPosition.to;
    });
    // if (allCommentsWithSameId.length > 1);
    // maxPos += last(allCommentsWithSameId).node.nodeSize;
    recalculateTops();
    dispatch(state.tr.removeMark(minPos, maxPos, commentMark));
    activeView.focus();
  };

  const onTextAreaBlur = () => {
    // TODO Save into local storage
    // if (content !== '') {
    //   onClickPost(content);
    // }
    setTimeout(() => {
      if (comment.attrs.conversation.length === 0 && !clickPost) {
        onClickResolve();
        activeView.focus();
      }
    }, 400);
  };

  const MemorizedComponent = useMemo(
    () => (
      <ConnectedCommentStyled
        active={isActive}
        data-box={commentId}
        length={comment.attrs.conversation.length === 0}
        style={styles}
      >
        <CommentBox
          active={isActive}
          commentData={comment.attrs.conversation}
          commentId={commentId}
          isReadOnly={isReadOnly}
          key={commentId}
          onClickBox={onClickBox}
          onClickPost={onClickPost}
          onClickResolve={onClickResolve}
          onTextAreaBlur={onTextAreaBlur}
          recalculateTops={recalculateTops}
          showTitle={showTitle}
          title={comment.attrs.title}
          users={users}
        />
      </ConnectedCommentStyled>
    ),
    [isActive, top, comment.attrs.conversation.length, users],
  );
  return <>{MemorizedComponent}</>;
};
