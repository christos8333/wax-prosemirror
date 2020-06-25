import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef
} from "react";

import { Transition } from "react-transition-group";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";

const CommentBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid #ffab20;
  position: absolute;
  transition: ${({ state }) => "top 1s, opacity 1.5s, left 1s"};
  top: ${props => (props.top ? `${props.top}px` : 0)};
  left: ${props => (props.active ? `${63}%` : `${65}%`)};
  opacity: ${({ state }) => {
    switch (state) {
      case "exited":
        return 0.2;
      case "exiting":
        return 0.4;
      case "entering":
        return 0.6;
      case "entered":
        return 1;
    }
  }};
`;

export default ({ comment, view, top, dataBox }) => {
  const { view: { main: { props: { user } } }, app, activeView } = useContext(
      WaxContext
    ),
    { state, dispatch } = activeView,
    commentInput = useRef(null),
    [animate, setAnimate] = useState(false),
    [commentAnnotation, setCommentAnnotation] = useState(comment),
    [currentUser, setCurrentuser] = useState(user),
    { attrs: { id } } = comment,
    activeCommentPlugin = app.PmPlugins.get("activeComment"),
    activeComment = activeCommentPlugin.getState(activeView.state).comment;

  let active = false;
  if (activeComment && id === activeComment.attrs.id) active = true;
  useEffect(() => {
    setAnimate(true);
  }, []);

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
      <Transition in={animate} timeout={1000}>
        {state => (
          <CommentBoxStyled
            top={top}
            state={state}
            data-box={dataBox}
            active={active}
          >
            <div>
              <input
                type="text"
                ref={commentInput}
                placeholder="add a new comment"
                onKeyPress={handleKeyDown}
                // autoFocus
              />
              <button onClick={saveComment}>Post</button>
              <button>Cancel</button>
            </div>
          </CommentBoxStyled>
        )}
      </Transition>
    </Fragment>
  );
};
