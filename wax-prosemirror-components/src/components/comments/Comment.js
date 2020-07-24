import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { last } from 'lodash';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const SinlgeCommentRow = styled.div`
  padding: 4px;
  border-bottom: 1px solid #ffab20;
`;

export default ({ comment, activeView, user }) => {
  const commentInput = useRef(null);
  const [commentAnnotation, setCommentAnnotation] = useState(comment);
  const [commentInputValue, setcommentInputValue] = useState('');
  const { state, dispatch } = activeView;
  const allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(state, comment);
  const {
    attrs: { conversation },
  } = comment;
  const commentMark = state.schema.marks.comment;

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      saveComment(event);
    }
  };

  const saveComment = event => {
    event.stopPropagation();

    const {
      current: { value },
    } = commentInput;
    const { tr, doc } = state;

    const obj = { [user.username]: value };
    commentAnnotation.attrs.conversation.push(obj);

    allCommentsWithSameId.forEach(singleComment => {
      dispatch(
        tr.addMark(
          singleComment.pos,
          singleComment.pos + singleComment.nodeSize,
          commentMark.create({
            ...((commentAnnotation && commentAnnotation.attrs) || {}),
            conversation: commentAnnotation.attrs.conversation,
          }),
        ),
      );
    });

    setcommentInputValue('');
  };

  const updateCommentInputValue = () => {
    const {
      current: { value },
    } = commentInput;
    setcommentInputValue(value);
  };

  const onBlur = () => {
    const {
      current: { value },
    } = commentInput;
    if (value !== '') {
      // saveComment();
    }

    if (conversation.length === 0 && value === '') {
      resolveComment();
    }
  };

  const resolveComment = event => {
    if (event) event.stopPropagation();
    let maxPos = comment.pos;
    let minPos = comment.pos;

    allCommentsWithSameId.forEach(singleComment => {
      const markPosition = DocumentHelpers.findMarkPosition(activeView, singleComment.pos, 'comment');
      if (markPosition.from < minPos) minPos = markPosition.from;
      if (markPosition.to > maxPos) maxPos = markPosition.to;
    });

    if (allCommentsWithSameId.length > 1) maxPos += last(allCommentsWithSameId).node.nodeSize;
    dispatch(state.tr.removeMark(minPos, maxPos, commentMark));
    activeView.focus();
  };

  const commentInputReply = () => {
    return (
      <>
        <input
          type="text"
          ref={commentInput}
          placeholder="add a new comment"
          onChange={updateCommentInputValue}
          onKeyPress={handleKeyDown}
          onBlur={onBlur}
          onClick={event => {
            event.stopPropagation();
          }}
          autoFocus
          value={commentInputValue}
        />
        <button type="button" onClick={event => saveComment(event)}>
          Post
        </button>
        <button type="button" onClick={event => resolveComment(event)}>
          Resolve
        </button>
      </>
    );
  };

  return conversation.length === 0 ? (
    <>{commentInputReply()}</>
  ) : (
    <>
      {conversation.map((singleComment, index) => {
        return (
          <SinlgeCommentRow key={uuidv4()}>{`${user.username} : ${singleComment[user.username]}`}</SinlgeCommentRow>
        );
      })}
      {commentInputReply()}
    </>
  );
};
