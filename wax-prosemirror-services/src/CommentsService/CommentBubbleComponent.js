import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const CommentBubbleComponent = ({ setPosition, position }) => {
  const { view: { main } } = useContext(WaxContext);
  const { state, dispatch } = main;
  const ref = useRef(null);

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
    console.log("create");
  };

  return (
    <button
      ref={ref}
      onClick={event => {
        createComment(event);
      }}
    >
      create
    </button>
  );
};

export default CommentBubbleComponent;
