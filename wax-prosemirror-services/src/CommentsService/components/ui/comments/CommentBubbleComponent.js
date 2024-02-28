/* eslint react/prop-types: 0 */
import React, { useLayoutEffect, useContext } from 'react';
import { WaxContext, Commands, DocumentHelpers } from 'wax-prosemirror-core';
import CommentBubble from './CommentBubble';
import { AnnotationPluginKey } from '../../../plugins/AnnotationPlugin';

const CommentBubbleComponent = ({ setPosition, position, group }) => {
  const { activeView, activeViewId } = useContext(WaxContext);
  const { state, dispatch } = activeView;

  useLayoutEffect(() => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const { selection } = activeView.state;
    const { from, to } = selection;
    const start = activeView.coordsAtPos(from);
    const end = activeView.coordsAtPos(to);
    const difference = end.top - start.top;
    const left = WaxSurface.width - 20;
    const top = end.top - WaxSurface.top - difference / 2 - 5;
    setPosition({ ...position, left, top });
  }, [position.left]);

  const createComment = event => {
    event.preventDefault();
    const { selection } = state;

    dispatch(
      state.tr.setMeta(AnnotationPluginKey, {
        type: 'addComment',
        from: selection.from,
        to: selection.to,
        data: [{ conversation: [], group, activeViewId }],
      }),
    );
    // Commands.createComment(state, dispatch, group, activeViewId);
    // activeView.focus();
  };

  const isCommentAllowed = () => {
    const commentMark = activeView.state.schema.marks.comment;
    const marks = DocumentHelpers.findMark(state, commentMark, true);

    let allowed = true;
    state.doc.nodesBetween(
      state.selection.$from.pos,
      state.selection.$to.pos,
      node => {
        if (
          node.type.name === 'math_display' ||
          node.type.name === 'math_inline' ||
          node.type.name === 'image'
        ) {
          allowed = false;
        }
      },
    );
    // TODO Overlapping comments . for now don't allow
    marks.forEach(mark => {
      if (mark.attrs.group === 'main') allowed = false;
    });

    // TO DO this is because of a bug and overlay doesn't rerender. Fix in properly in Notes, and remove
    if (activeViewId !== 'main' && marks.length >= 1) allowed = false;
    return allowed;
  };

  return (
    isCommentAllowed() && (
      <CommentBubble
        onClick={event => {
          createComment(event);
        }}
      />
    )
  );
};

export default CommentBubbleComponent;
