import React, { useLayoutEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Commands, DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';

const CommentBubbleComponent = ({
  setPosition,
  position,
  showComment,
  group,
}) => {
  const { activeView, activeViewId } = useContext(WaxContext);
  const { state, dispatch } = activeView;
  useLayoutEffect(() => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const { selection } = activeView.state;
    const { from, to } = selection;
    const start = activeView.coordsAtPos(from);
    const end = activeView.coordsAtPos(to);
    const difference = end.top - start.top;
    const left = WaxSurface.width + WaxSurface.x;
    const top = end.top - difference / 2 - 5;
    setPosition({ ...position, left, top });
  }, [position.left]);

  const createComment = event => {
    event.preventDefault();
    Commands.createComment(state, dispatch, group, activeViewId);
    activeView.focus();
  };

  const isSelectionComment = () => {
    const commentMark = activeView.state.schema.marks.comment;
    const mark = DocumentHelpers.findMark(state, commentMark, true);
    const {
      selection: { $from, $to },
      doc,
    } = state;

    //TODO Overlapping comments . for now don't allow
    if (mark.length >= 1) return true;
    return false;
  };

  return (
    !isSelectionComment() &&
    showComment(activeViewId) && (
      <button
        onMouseDown={event => {
          createComment(event);
        }}
      >
        create
      </button>
    )
  );
};

export default CommentBubbleComponent;
