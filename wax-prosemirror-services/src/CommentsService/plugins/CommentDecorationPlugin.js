import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { flatten } from 'lodash';
import CommentState from './CommentState';
import CommentDecorationPluginKey from './CommentDecorationPluginKey';

let contentSize = 0;
let allCommentsCount = 0;

const CommentDecorationPlugin = (name, options) => {
  return new Plugin({
    key: CommentDecorationPluginKey,
    state: {
      init() {
        return new CommentState({
          context: options.context,
          map: options.existingComments(),
          commentsDataMap: options.commentsDataMap,
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
          options.context.app.config.get('config.YjsService') &&
          this.getState(state).allCommentsList().length !== allCommentsCount
        ) {
          this.getState(state)
            .getMap()
            .observe(() => {
              const transaction = options.context.pmViews.main.state.tr.setMeta(
                CommentDecorationPluginKey,
                {
                  type: 'createDecorations',
                },
              );

              options.context.pmViews.main.dispatch(transaction);
            });
          this.getState(state)
            .getCommentsDataMap()
            .observe(() => {
              const transaction = options.context.pmViews.main.state.tr.setMeta(
                CommentDecorationPluginKey,
                {
                  type: 'createDecorations',
                },
              );

              options.context.pmViews.main.dispatch(transaction);
            });
        }

        if (
          contentSize !== state.doc.content.size ||
          this.getState(state).allCommentsList().length !== allCommentsCount
        ) {
          options.onSelectionChange(this.getState(state).allCommentsList());
          this.getState(state).createDecorations(state);
        }
        contentSize = state.doc.content.size;
        allCommentsCount = this.getState(state).allCommentsList().length;
        return decorations;
      },
      handleKeyDown(view, event) {
        const { state } = view;

        if (event.key === 'Enter' && !event.shiftKey) {
          this.getState(state).setTransactYjsPos(true);
        } else {
          this.getState(state).setTransactYjsPos(false);
        }

        if (
          event.key === 'Backspace' ||
          event.key === 'Delete' ||
          event.key === 'Caps-Lock'
        ) {
          setTimeout(() => {
            const ids = this.getState(state).decorations.children.map(child => {
              if (child instanceof DecorationSet) {
                return child.local.map(l => l.type.attrs['data-id']);
              }
            });
            const idsLocal = this.getState(state).decorations.local.map(
              child => {
                if (child instanceof Decoration) {
                  return child.type.attrs['data-id'];
                }
              },
            );
            const finalIds = flatten(ids.filter(id => id)).concat(idsLocal);
            const deletedComments = this.getState(state)
              .allCommentsList()
              ?.filter(comment => !finalIds.includes(comment.id));

            if (deletedComments?.length > 0) {
              deletedComments.forEach(deletedComment => {
                options.context.setOption({
                  resolvedComment: deletedComment.id,
                });
                view.dispatch(
                  view.state.tr.setMeta(CommentDecorationPluginKey, {
                    type: 'deleteComment',
                    id: deletedComment.id,
                  }),
                );
              });
            }
          }, 100);
        }

        return false;
      },
    },
  });
};

export default CommentDecorationPlugin;
