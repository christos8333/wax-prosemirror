import { Plugin, PluginKey } from 'prosemirror-state';
import { flatten } from 'lodash';
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

        // const ids = this.getState(state).decorations.children.map(child => {
        //   if (child.constructor.name === 'DecorationSet') {
        //     return child.local.map(l => l.type.attrs['data-id']);
        //   }
        // });
        // const finalIds = flatten(ids.filter(id => id));
        // const deletedComments = options.context.options.comments?.filter(
        //   comment => !finalIds.includes(comment.id),
        // );

        // if (deletedComments?.length > 0) {
        //   deletedComments.forEach(deletedComment => {
        //     options.context.setOption({ resolvedComment: deletedComment.id });
        //     options.context.setOption({
        //       comments: options.context.options.comments.filter(comment => {
        //         return comment.id !== deletedComment.id;
        //       }),
        //     });
        //     this.getState(state).getMap().delete(deletedComment.id);
        //   });
        // }

        if (
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
        if (event.key === 'Enter' && !event.shiftKey) {
          console.log('enter');
          this.getState(view.state).setTransactYjsPos(true);
        } else {
          this.getState(view.state).setTransactYjsPos(false);
        }
        return false;
      },
    },
  });
};
