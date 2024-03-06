/* eslint-disable consistent-return */
import { inRange, sortBy, last } from 'lodash';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const commentPlugin = new PluginKey('commentPlugin');

const getComment = (state, context) => {
  const {
    options: { comments },
  } = context;
  if (!comments?.length) return;

  let commentData = comments.filter(comment =>
    inRange(state.selection.from, comment.from, comment.to),
  );

  commentData = sortBy(commentData, ['from']);

  if (commentData.length > 0) {
    return {
      from: last(commentData).from,
      to: last(commentData).to,
      attrs: last(commentData).data,
      id: last(commentData).id,
      // contained: commentOnSelection.contained,
    };
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
