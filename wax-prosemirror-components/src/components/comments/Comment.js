import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef
} from "react";
import { v4 as uuidv4 } from "uuid";

import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";

const SinlgeCommentRow = styled.div`
  padding: 4px;
  border-bottom: 1px solid #ffab20;
`;

export default ({ comment, activeView, user }) => {
  const commentInput = useRef(null);
  const [currentUser, setCurrentuser] = useState(user);
  const [commentAnnotation, setCommentAnnotation] = useState(comment);
  const [commentInputValue, setcommentInputValue] = useState("");
  const { state, dispatch } = activeView;
  const { attrs: { conversation } } = comment;

  const handleKeyDown = event => {
    if (event.key === "Enter" || event.which === 13) {
      saveComment();
    }
  };

  const saveComment = () => {
    const { current: { value } } = commentInput;
    const { tr, doc } = state;
    const commentMark = state.schema.marks.comment;

    const obj = { [user.username]: value };
    commentAnnotation.attrs.conversation.push(obj);

    dispatch(
      tr.addMark(
        commentAnnotation.pos,
        commentAnnotation.pos + commentAnnotation.node.nodeSize,
        commentMark.create({
          ...((commentAnnotation && commentAnnotation.attrs) || {}),
          conversation: commentAnnotation.attrs.conversation
        })
      )
    );
    setcommentInputValue("");
  };

  const updateCommentInputValue = () => {
    const { current: { value } } = commentInput;
    setcommentInputValue(value);
  };

  const commentInputReply = () => {
    return (
      <Fragment>
        <input
          type="text"
          ref={commentInput}
          placeholder="add a new comment"
          onChange={updateCommentInputValue}
          onKeyPress={handleKeyDown}
          autoFocus
          value={commentInputValue}
        />
        <button onClick={saveComment}>Post</button>
        <button>Cancel</button>
      </Fragment>
    );
  };

  return conversation.length === 0 ? (
    <Fragment>{commentInputReply()}</Fragment>
  ) : (
    <Fragment>
      {conversation.map((singleComment, index) => {
        return (
          <SinlgeCommentRow key={uuidv4()}>{`${user.username} : ${
            singleComment[user.username]
          }`}</SinlgeCommentRow>
        );
      })}
      {commentInputReply()}
    </Fragment>
  );
};
