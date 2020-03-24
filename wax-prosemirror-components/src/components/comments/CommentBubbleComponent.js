import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Commands } from "wax-prosemirror-utilities";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

const CommentBubbleComponent = ({ setPosition, position }) => {
  const { view: { main }, app } = useContext(WaxContext);
  const user = app.config.get("user");
  const { state, dispatch } = main;

  useEffect(
    () => {
      const WaxSurface = main.dom.offsetParent.firstChild.getBoundingClientRect();
      const left = WaxSurface.width;
      setPosition({ ...position, left });
    },
    [position.left]
  );

  const createComment = event => {
    event.preventDefault();
    Commands.createComment(state, dispatch, user);
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
