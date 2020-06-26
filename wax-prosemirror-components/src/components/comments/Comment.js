import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef
} from "react";

import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";

export default ({ comment, activeView, user }) => {
  const commentInput = useRef(null);
  const [currentUser, setCurrentuser] = useState(user);
  const [commentAnnotation, setCommentAnnotation] = useState(comment);
  const { state, dispatch } = activeView;
  const { attrs: { conversation } } = comment;

  console.log("dddd", conversation);
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
  };

  return (
    <Fragment>
      <input
        type="text"
        ref={commentInput}
        placeholder="add a new comment"
        onKeyPress={handleKeyDown}
        autoFocus
      />
      <button onClick={saveComment}>Post</button>
      <button>Cancel</button>
    </Fragment>
  );
};
