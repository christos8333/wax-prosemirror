import React, { Fragment, useState, useEffect, useContext } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";

const CommentBoxStyled = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: black;
  position: absolute;
  transition: ${({ state }) => "top 1s, opacity 1.5s"};
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

export default ({ mark, view, top, dataComment }) => {
  const [animate, setAnimate] = useState(false);
  const { view: { main }, app, activeView } = useContext(WaxContext);
  const activeCommentPlugin = app.PmPlugins.get("activeComment");
  const activeComment = activeCommentPlugin.getState(activeView.state).comment;
  let active = false;
  if (activeComment && mark.attrs.id === activeComment.attrs.id) active = true;
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
            data-comment={dataComment}
            active={active}
          />
        )}
      </Transition>
    </Fragment>
  );
};
