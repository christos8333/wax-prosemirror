import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { flatten } from 'lodash';
import CommentState from './CommentState';
import CommentDecorationPluginKey from './CommentDecorationPluginKey';

let contentSize = 0;
let allCommentsCount = 0;
let decorationUpdateTimeout = null;

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
        const action = transaction.getMeta(CommentDecorationPluginKey);
        // Force decoration creation for comment-related actions
        if (
          action &&
          (action.type === 'addComment' ||
            action.type === 'updateComment' ||
            action.type === 'deleteComment')
        ) {
          pluginState.createDecorations(newState);
        }
        return pluginState.apply(transaction, newState);
      },
    },
    props: {
      decorations(state) {
        const { decorations } = this.getState(state);
        const currentContentSize = state.doc.content.size;
        const currentCommentsCount = this.getState(state).allCommentsList()
          .length;

        // Only update decorations if content or comments have changed
        if (
          currentContentSize !== contentSize ||
          currentCommentsCount !== allCommentsCount
        ) {
          // Clear any pending updates
          if (decorationUpdateTimeout) {
            clearTimeout(decorationUpdateTimeout);
          }

          // Debounce decoration updates
          decorationUpdateTimeout = setTimeout(() => {
            options.onSelectionChange(this.getState(state).allCommentsList());
            this.getState(state).createDecorations(state);
            contentSize = currentContentSize;
            allCommentsCount = currentCommentsCount;
          }, 100);
        }

        // Handle Yjs updates separately with debouncing
        if (options.context.app.config.get('config.YjsService')) {
          const yjsUpdate = () => {
            if (decorationUpdateTimeout) {
              clearTimeout(decorationUpdateTimeout);
            }
            decorationUpdateTimeout = setTimeout(() => {
              const transaction = options.context.pmViews.main.state.tr.setMeta(
                CommentDecorationPluginKey,
                {
                  type: 'createDecorations',
                },
              );
              options.context.pmViews.main.dispatch(transaction);
            }, 100);
          };

          // Only set up observers once
          if (!this._observersSet) {
            this.getState(state).getMap().observe(yjsUpdate);
            this.getState(state).getCommentsDataMap().observe(yjsUpdate);
            this._observersSet = true;
          }
        }

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
