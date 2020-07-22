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
    const commentMark = state.schema.marks.comment;

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

  const commentInputReply = () => {
    return (
      <>
        <input
          type="text"
          ref={commentInput}
          placeholder="add a new comment"
          onChange={updateCommentInputValue}
          onKeyPress={handleKeyDown}
          autoFocus
          value={commentInputValue}
        />
        <button type="button" onClick={saveComment}>
          Post
        </button>
        <button type="button">Cancel</button>
      </>
    );
  };

  return conversation.length === 0 ? (
    <>{commentInputReply()}</>
  ) : (
    <>
      {conversation.map((singleComment, index) => {
        return (
          <SinlgeCommentRow key={uuidv4()}>{`${user.username} : ${
            singleComment[user.username]
          }`}</SinlgeCommentRow>
        );
      })}
      {commentInputReply()}
    </>
  );
};
