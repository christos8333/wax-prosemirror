/* eslint-disable no-underscore-dangle */
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

        if (event.key === 'Backspace' || event.key === 'Delete') {
          // Get the current selection
          const { from, to } = state.selection;

          // Find all comments that overlap with the deleted text
          const comments = this.getState(state).allCommentsList();
          const deletedComments = comments.filter(comment => {
            const commentFrom = comment.data.pmFrom;
            const commentTo = comment.data.pmTo;
            // Delete if either:
            // 1. Comment is 1 character long and overlaps with deleted text
            // 2. Comment is completely contained within the selection
            return (
              (commentTo - commentFrom === 1 && commentFrom <= to && commentTo >= from) ||
              (commentFrom >= from && commentTo <= to)
            );
          });

          // Delete the comments that overlap with the deleted text
          if (deletedComments.length > 0) {
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
        }

        return false;
      },
    },
  });
};

export default CommentDecorationPlugin;
