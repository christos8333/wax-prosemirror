/* eslint react/prop-types: 0 */
import React, { useLayoutEffect, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBubble from './CommentBubble';
import { AnnotationPluginKey } from '../../../plugins/AnnotationPlugin';

const CommentBubbleComponent = ({ setPosition, position, group }) => {
  const {
    activeView,
    activeViewId,
    options: { comments },
  } = useContext(WaxContext);

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
        data: {
          type: 'comment',
          conversation: [],
          title: '',
          group,
          viewId: activeViewId,
        },
      }),
    );
    dispatch(state.tr);
  };

  const isCommentAllowed = () => {
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

    if (
      comments.find(
        comm =>
          comm.from === state.selection.from && comm.to === state.selection.to,
      )
    ) {
      allowed = false;
    }

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
