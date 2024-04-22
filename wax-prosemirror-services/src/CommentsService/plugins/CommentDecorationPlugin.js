import { Plugin, PluginKey } from 'prosemirror-state';
import CommentState from './CommentState';

let contentSize = 0;
let allCommentsCount = 0;

export const CommentDecorationPluginKey = new PluginKey(
  'commentDecorationPlugin',
);
export const CommentDecorationPlugin = (name, options) => {
  return new Plugin({
    key: CommentDecorationPluginKey,
    state: {
      init() {
        return new CommentState({
          context: options.context,
          map: options.existingComments(),
          onSelectionChange: options.onSelectionChange,
        });
      },
      apply(transaction, pluginState, oldState, newState) {
        return pluginState.apply(transaction, newState);
      },
    },
    props: {
      decorations(state) {
        const { decorations } = this.getState(state);
        if (
          contentSize !== state.doc.content.size ||
          this.getState(state).allCommentsList().length !== allCommentsCount
        ) {
          // const annotations = this.getState(state).commentsAt(
          //   0,
          //   state.doc.content.size,
          // );
          // options.onSelectionChange(annotations);

          options.onSelectionChange(this.getState(state).allCommentsList());
        }
        contentSize = state.doc.content.size;
        allCommentsCount = this.getState(state).allCommentsList().length;
        return decorations;
      },
    },
  });
};
