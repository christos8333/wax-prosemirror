/* eslint-disable consistent-return */
import { inRange, last } from 'lodash';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const commentPlugin = new PluginKey('commentPlugin');

const getComment = (state, context) => {
  const {
    options: { comments },
  } = context;
  if (!comments?.length) return;

  const commentData = comments.filter(comment =>
    inRange(state.selection.from, comment.from, comment.to),
  );

  if (commentData.length > 0) {
    if (
      state.selection.from !== state.selection.to &&
      state.selection.to < last(commentData).to
    ) {
      return {};
    }
    return last(commentData);
  }
  return {};
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
            Decoration.inline(comment.from, comment.to, {
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
