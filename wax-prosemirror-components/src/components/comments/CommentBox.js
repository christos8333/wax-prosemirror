import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

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
          />
        )}
      </Transition>
    </Fragment>
  );
};
