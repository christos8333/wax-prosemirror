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
import Comment from "./Comment";

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
    [animate, setAnimate] = useState(false),
    { attrs: { id } } = comment,
    activeCommentPlugin = app.PmPlugins.get("activeComment"),
    activeComment = activeCommentPlugin.getState(activeView.state).comment;

  let active = false;
  if (activeComment && id === activeComment.attrs.id) active = true;
  useEffect(() => {
    setAnimate(true);
  }, []);

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
            <Comment
              comment={comment}
              active={active}
              activeView={activeView}
              user={user}
            />
          </CommentBoxStyled>
        )}
      </Transition>
    </Fragment>
  );
};
