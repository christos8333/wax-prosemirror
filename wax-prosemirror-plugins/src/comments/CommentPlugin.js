/* eslint-disable */

import { minBy, maxBy, last } from 'lodash';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const commentPlugin = new PluginKey('commentPlugin');

const getComment = state => {
  const commentMark = state.schema.marks.comment;
  const commentOnSelection = DocumentHelpers.findFragmentedMark(
    state,
    commentMark,
  );

  // Don't allow Active comment if selection is not collapsed
  if (
    state.selection.from !== state.selection.to &&
    commentOnSelection &&
    commentOnSelection.attrs.conversation.length
  ) {
    return;
  }

  if (commentOnSelection) {
    const commentNodes = DocumentHelpers.findChildrenByMark(
      state.doc,
      commentMark,
      true,
    );

    const allCommentsWithSameId = [];
    commentNodes.map(node => {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === 'comment' &&
          commentOnSelection.attrs.id === mark.attrs.id
        ) {
          allCommentsWithSameId.push(node);
        }
      });
    });

    const minPos = minBy(allCommentsWithSameId, 'pos');
    const maxPos = maxBy(allCommentsWithSameId, 'pos');

    if (
      state.selection.from ===
      maxPos.pos + last(allCommentsWithSameId).node.nodeSize
    ) {
      state.schema.marks.comment.spec.inclusive = false;
    } else {
      state.schema.marks.comment.spec.inclusive = true;
    }
    if (allCommentsWithSameId.length > 1) {
      return {
        from: minPos.pos,
        to: maxPos.pos + last(allCommentsWithSameId).node.nodeSize,
        attrs: commentOnSelection.attrs,
        contained: commentOnSelection.contained,
      };
    }
  }
  return commentOnSelection;
};

export default props => {
  return new Plugin({
    key: commentPlugin,
    state: {
      init: (_, state) => {
        return { comment: getComment(state) };
      },
      apply(tr, prev, _, newState) {
        const comment = getComment(newState);
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
