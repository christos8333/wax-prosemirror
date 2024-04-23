/* eslint react/prop-types: 0 */
import React, { useLayoutEffect, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import {
  ySyncPluginKey,
  relativePositionToAbsolutePosition,
  absolutePositionToRelativePosition,
} from 'y-prosemirror';
import CommentBubble from './CommentBubble';
import { CommentDecorationPluginKey } from '../../../plugins/CommentDecorationPlugin';

const CommentBubbleComponent = ({ setPosition, position, group }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    options: { comments, commentsMap },
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

    if (context.app.config.get('config.YjsService')) {
      return createYjsComments(selection);
    }

    dispatch(
      state.tr.setMeta(CommentDecorationPluginKey, {
        type: 'addComment',
        from: selection.from,
        to: selection.to,
        data: {
          type: 'comment',
          yjsFrom: selection.from,
          yjsTo: selection.to,
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

  const createYjsComments = selection => {
    const ystate = ySyncPluginKey.getState(state);
    const { doc, type, binding } = ystate;
    const from = absolutePositionToRelativePosition(
      selection.from,
      type,
      binding.mapping,
    );
    const to = absolutePositionToRelativePosition(
      selection.to,
      type,
      binding.mapping,
    );

    commentsMap.observe(() => {
      const transaction = context.pmViews.main.state.tr.setMeta(
        CommentDecorationPluginKey,
        {
          type: 'createDecorations',
        },
      );
      context.pmViews.main.dispatch(transaction);
    });

    dispatch(
      state.tr.setMeta(CommentDecorationPluginKey, {
        type: 'addComment',
        from: relativePositionToAbsolutePosition(
          doc,
          type,
          from,
          binding.mapping,
        ),
        to: relativePositionToAbsolutePosition(doc, type, to, binding.mapping),
        data: {
          yjsFrom: selection.from,
          yjsTo: selection.to,
          pmFrom: selection.from,
          pmTo: selection.to,
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
          comm.data.pmFrom === state.selection.from &&
          comm.data.pmTo === state.selection.to,
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
