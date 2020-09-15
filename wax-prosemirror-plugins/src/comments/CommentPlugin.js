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
    const actualComment = DocumentHelpers.findMarkPosition(
      state,
      commentOnSelection.from,
      'comment',
    );
    return actualComment;
  }
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
      setCommentActive: state => {},
    },
  });
};
