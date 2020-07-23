import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
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
  const {
    attrs: { conversation },
  } = comment;
  const commentMark = state.schema.marks.comment;

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      saveComment();
    }
  };

  const saveComment = () => {
    const {
      current: { value },
    } = commentInput;
    const { tr, doc } = state;

    const obj = { [user.username]: value };
    commentAnnotation.attrs.conversation.push(obj);

    const allComments = DocumentHelpers.findAllCommentsWithSameId(state);
    allComments.forEach(singleComment => {
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

    // TODO pass correct comment pos for notes
    if (conversation.length === 0 && value === '') {
      const commentPosition = DocumentHelpers.findMarkPosition(activeView, comment.pos, 'comment');
      dispatch(state.tr.removeMark(commentPosition.from, commentPosition.to, commentMark));
    }
  };

  const resolveComment = () => {
    // TODO pass correct comment pos for notes
    const commentPosition = DocumentHelpers.findMarkPoistion(activeView, comment.pos, 'comment');
    dispatch(state.tr.removeMark(commentPosition.from, commentPosition.to, commentMark));
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
        <button type="button" onClick={saveComment}>
          Post
        </button>
        <button type="button" onClick={resolveComment}>
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
