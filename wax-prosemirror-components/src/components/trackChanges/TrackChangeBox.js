import { Mark } from "prosemirror-model";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";

const TrackChangeBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid blue;
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

export default ({ trackChange, view, top, dataBox }) => {
  console.log(trackChange);
  const [animate, setAnimate] = useState(false);
  const { view: { main }, app, activeView } = useContext(WaxContext);
  let action;
  if (trackChange instanceof Mark) {
    if ((trackChange.type.name = "format_change")) {
      const { attrs: { username, before, after } } = trackChange;
      action = `User ${username} added ${after[0]}`;
    }
  } else {
    action = `User demo changed paragraph to heading 1`;
  }
  // const { attrs: { id } } = comment;

  // const activeCommentPlugin = app.PmPlugins.get("activeComment");
  // const activeComment = activeCommentPlugin.getState(activeView.state).comment;
  let active = false;
  // if (activeComment && id === activeComment.attrs.id) active = true;
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Fragment>
      <Transition in={animate} timeout={1000}>
        {state => (
          <TrackChangeBoxStyled
            top={top}
            state={state}
            data-box={dataBox}
            active={active}
          >
            <div>
              {action}
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </TrackChangeBoxStyled>
        )}
      </Transition>
    </Fragment>
  );
};
