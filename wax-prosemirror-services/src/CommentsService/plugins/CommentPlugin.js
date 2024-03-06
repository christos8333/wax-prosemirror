/* eslint-disable */

import { minBy, maxBy, last } from 'lodash';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-core';

const commentPlugin = new PluginKey('commentPlugin');

const getComment = (state, context) => {
  const {
    options: { comments },
  } = context;
  if (!comments?.length) return;
  console.log('sds', comments);

  return {
    from: comments[0].from,
    to: comments[0].to,
    attrs: comments[0].data,
    id: comments[0].id,
    // contained: commentOnSelection.contained,
  };
};

c;
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
