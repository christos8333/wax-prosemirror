import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Commands } from "wax-prosemirror-utilities";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

const CommentBubbleComponent = ({ setPosition, position }) => {
  const { view: { main }, activeView } = useContext(WaxContext);
  const { state, dispatch } = activeView;

  useEffect(
    () => {
      const WaxSurface = activeView.dom.getBoundingClientRect();
      const { selection } = activeView.state;
      const { from, to } = selection;
      const end = activeView.coordsAtPos(to);
      const left = WaxSurface.width + WaxSurface.x;
      const top = end.top;
      setPosition({ ...position, left, top });
    },
    [position.left]
  );

  const createComment = event => {
    event.preventDefault();
    Commands.createComment(state, dispatch);
  };

  return (
    <button
      onClick={event => {
        createComment(event);
      }}
    >
      create
    </button>
  );
};

export default CommentBubbleComponent;
