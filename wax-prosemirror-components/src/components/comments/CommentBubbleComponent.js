import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Commands } from "wax-prosemirror-utilities";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

const CommentBubbleComponent = ({ setPosition, position }) => {
  const { view: { main }, activeView } = useContext(WaxContext);
  const { state, dispatch } = activeView;

  useEffect(
    () => {
      // const WaxSurface = activeView.dom.getBoundingClientRect();
      // const left = WaxSurface.width;
      // setPosition({ ...position, left });
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
