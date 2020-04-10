import React, { useLayoutEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Commands } from "wax-prosemirror-utilities";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

const CommentBubbleComponent = ({ setPosition, position }) => {
  const { activeView, activeViewId } = useContext(WaxContext);
  const { state, dispatch } = activeView;
  useLayoutEffect(
    () => {
      const WaxSurface = activeView.dom.getBoundingClientRect();
      const { selection } = activeView.state;
      const { from, to } = selection;
      const start = activeView.coordsAtPos(from);
      const end = activeView.coordsAtPos(to);
      const difference = end.top - start.top;
      const left = WaxSurface.width + WaxSurface.x;
      const top = end.top - difference / 2 - 5;
      setPosition({ ...position, left, top });
    },
    [position.left]
  );

  const createComment = event => {
    event.preventDefault();
    Commands.createComment(state, dispatch, activeViewId);
  };

  const isSelectionComment = () => {
    //TODO if selection is contained in comment do not show button
    return false;
  };

  return (
    !isSelectionComment() && (
      <button
        onClick={event => {
          createComment(event);
        }}
      >
        create
      </button>
    )
  );
};

export default CommentBubbleComponent;
