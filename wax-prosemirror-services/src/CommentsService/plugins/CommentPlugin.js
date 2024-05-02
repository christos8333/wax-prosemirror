/* eslint-disable consistent-return */
import { inRange, last, sortBy } from 'lodash';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { CommentDecorationPluginKey } from './CommentDecorationPlugin';

const commentPlugin = new PluginKey('commentPlugin');

const getComment = (state, context) => {
  const commentsMap = CommentDecorationPluginKey.getState(state).getMap();
  const commentsDataMap = CommentDecorationPluginKey.getState(
    state,
  ).getCommentsDataMap();
  if (commentsMap.size === 0) return;
  let commentData = [];

  commentsMap.forEach(comment => {
    if (inRange(state.selection.from, comment.data.pmFrom, comment.data.pmTo)) {
      commentData.push(comment);
    } else if (state.selection.from === state.selection.to) {
      context.setOption({ activeComment: undefined });
    }
  });

  commentData = sortBy(commentData, ['data.pmFrom']);

  if (commentData.length > 0) {
    if (
      (state.selection.from !== state.selection.to &&
        commentsDataMap.get(last(commentData)?.id)?.data?.conversation
          .length === 0) ||
      (state.selection.from === state.selection.to &&
        commentsDataMap.get(last(commentData)?.id)?.data?.conversation
          .length !== 0)
    ) {
      context.setOption({ activeComment: last(commentData) });
      return last(commentData);
    }
    context.setOption({ activeComment: undefined });
    return undefined;
  }

  return undefined;
};

export default (key, context) => {
  return new Plugin({
    key: commentPlugin,
    state: {
      init: (_, state) => {
        return { comment: getComment(state, context) };
      },
      apply(tr, prev, _, newState) {
        const comment = getComment(newState, context);
        let createDecoration;
        if (comment) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(comment.data.pmFrom, comment.data.pmTo, {
              class: 'active-comment',
            }),
          ]);
        }
        return {
          comment,
          createDecoration,
        };
      },
    },
    props: {
      decorations: state => {
        const commentPluginState = state && commentPlugin.getState(state);
        return commentPluginState.createDecoration;
      },
    },
  });
};
