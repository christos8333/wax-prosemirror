/* eslint react/prop-types: 0 */
import React, { useLayoutEffect, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBubble from './CommentBubble';
import CommentDecorationPluginKey from '../../../plugins/CommentDecorationPluginKey';

const CommentBubbleComponent = ({ setPosition, position, group }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;
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
      state.tr.setMeta(CommentDecorationPluginKey, {
        type: 'addComment',
        from: selection.from,
        to: selection.to,
        data: {
          type: 'comment',
          pmFrom: selection.from,
          pmTo: selection.to,
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
    const commentsMap = CommentDecorationPluginKey.getState(state).getMap();
    const commentData = [];
    commentsMap.forEach(comment => {
      if (
        comment.data.pmFrom === state.selection.from &&
        comment.data.pmTo === state.selection.to
      ) {
        commentData.push(comment);
      }
      if (commentData.length !== 0) allowed = false;
    });
    return allowed;
  };

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  return (
    isCommentAllowed() &&
    isEditable && (
      <CommentBubble
        onClick={event => {
          createComment(event);
        }}
      />
    )
  );
};

export default CommentBubbleComponent;
