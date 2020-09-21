/* eslint react/prop-types: 0 */
import React, { useContext, memo } from 'react';
import { TextSelection } from 'prosemirror-state';
import { last, maxBy } from 'lodash';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBox from '../../ui/comments/CommentBox';

const ConnectedCommentStyled = styled.div`
  position: absolute;
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  width: 200px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ comment, top, commentId, recalculateTops }) => {
  // const MemorizedComponent = memo(() => {
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

  const { state, dispatch } = activeView;
  const viewId = comment.attrs.viewid;

  const allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(
    view[viewId].state,
    comment,
  );

  const commentMark = state.schema.marks.comment;

  let active = false;

  const styles = {
    top: `${top}px`,
  };

  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const activeComment = commentPlugin.getState(activeView.state).comment;

  if (activeComment && commentId === activeComment.attrs.id) active = true;

  const onClickPost = content => {
    const { tr } = state;

    const obj = {
      content,
      displayName: user.username,
      timestamp: Math.floor(Date.now() / 300000),
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
    recalculateTops();
  };

  const onClickBox = () => {
    if (active) {
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
    recalculateTops();
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

    if (allCommentsWithSameId.length > 1)
      maxPos += last(allCommentsWithSameId).node.nodeSize;
    dispatch(state.tr.removeMark(minPos, maxPos, commentMark));
    activeView.focus();
  };

  const onTextAreaBlur = (content, isNewComment) => {
    // TODO Save into local storage
    if (content !== '') {
      onClickPost(content);
    }

    if (content === '' && isNewComment) {
      onClickResolve();
      activeView.focus();
    }
  };

  return (
    <ConnectedCommentStyled data-box={commentId} style={styles} active={active}>
      <CommentBox
        key={commentId}
        active={active}
        commentId={commentId}
        commentData={comment.attrs.conversation}
        onClickPost={onClickPost}
        onClickBox={onClickBox}
        onClickResolve={onClickResolve}
        recalculateTops={recalculateTops}
        onTextAreaBlur={onTextAreaBlur}
      />
    </ConnectedCommentStyled>
  );
  // });
  // return <MemorizedComponent />;
};
