/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { TextSelection } from 'prosemirror-state';
import { last, maxBy } from 'lodash';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBox from '../../ui/comments/CommentBox';

const ConnectedCommentStyled = styled.div`
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  position: absolute;
  width: 200px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ comment, top, commentId, recalculateTops }) => {
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

  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = activeView;
  const viewId = comment.attrs.viewid;
  let allCommentsWithSameId = [];

  if (view[viewId]) {
    allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(
      view[viewId].state,
      comment,
    );
  }

  const commentMark = state.schema.marks.comment;

  const styles = {
    top: `${top}px`,
  };

  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const activeComment = commentPlugin.getState(activeView.state).comment;

  useEffect(() => {
    setIsActive(false);
    if (activeComment && commentId === activeComment.attrs.id) {
      setIsActive(true);
      recalculateTops();
    }
  }, [activeComment]);

  const onClickPost = content => {
    const { tr } = state;

    const obj = {
      content,
      displayName: user.username,
      timestamp: Math.floor(Date.now()),
    };

    comment.attrs.conversation.push(obj);

    allCommentsWithSameId.forEach(singleComment => {
      dispatch(
        tr.addMark(
          singleComment.pos,
          singleComment.pos + singleComment.nodeSize,
          commentMark.create({
            ...((comment && comment.attrs) || {}),
            conversation: comment.attrs.conversation,
          }),
        ),
      );
    });
    activeView.focus();
    recalculateTops();
  };

  const onClickBox = () => {
    if (isActive) {
      view[viewId].focus();
      return false;
    }

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
    dispatch(state.tr.removeMark(minPos, maxPos, commentMark));
    activeView.focus();
  };

  const onTextAreaBlur = (content, isNewComment) => {
    // TODO Save into local storage
    // if (content !== '') {
    //   onClickPost(content);
    // }

    setTimeout(() => {
      if (comment.attrs.conversation.length === 0 && isNewComment) {
        onClickResolve();
        activeView.focus();
      }
    }, 500);
  };

  const MemorizedComponent = useMemo(
    () => (
      <ConnectedCommentStyled
        active={isActive}
        data-box={commentId}
        style={styles}
      >
        <CommentBox
          active={isActive}
          commentData={comment.attrs.conversation}
          commentId={commentId}
          key={commentId}
          onClickBox={onClickBox}
          onClickPost={onClickPost}
          onClickResolve={onClickResolve}
          onTextAreaBlur={onTextAreaBlur}
          recalculateTops={recalculateTops}
        />
      </ConnectedCommentStyled>
    ),
    [isActive, top, comment.attrs.conversation.length],
  );
  return <>{MemorizedComponent}</>;
};
