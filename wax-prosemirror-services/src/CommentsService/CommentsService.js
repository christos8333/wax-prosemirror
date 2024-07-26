import { Service } from 'wax-prosemirror-core';
import CommentBubbleComponent from './components/ui/comments/CommentBubbleComponent';
import RightArea from './components/RightArea';
import commentMark from './schema/commentMark';
import CommentPlugin from './plugins/CommentPlugin';
import CommentDecorationPlugin from './plugins/CommentDecorationPlugin';
import './comments.css';

export default class CommentsService extends Service {
  allCommentsFromStates = [];
  boot() {
    const commentsConfig = this.app.config.get('config.CommentsService');

    const options = {
      existingComments: () => {
        const map = this.app.config.get('config.YjsService')
          ? this.app.context.options.currentYdoc.getMap('comments')
          : new Map();

        if (commentsConfig?.setComments().length > 0) {
          commentsConfig.setComments().forEach(value => {
            map.set(value.id, value);
          });
        }

        return map;
      },
      commentsDataMap: this.app.config.get('config.YjsService')
        ? this.app.context.options.currentYdoc.getMap('commentsDataMap')
        : new Map(),
      context: { ...this.app.context, app: this.app },
      onSelectionChange: items => {
        this.allCommentsFromStates = this.allCommentsFromStates.filter(
          comm =>
            (items.find(item => item.id === comm.id) || {}).id !== comm.id,
        );
        this.allCommentsFromStates = this.allCommentsFromStates.concat([
          ...items,
        ]);

        if (this.app.context.options.resolvedComment) {
          this.allCommentsFromStates = this.allCommentsFromStates.filter(
            comm => {
              return comm.id !== this.app.context.options.resolvedComment;
            },
          );
        }

        if (commentsConfig?.getComments) {
          commentsConfig.getComments(this.allCommentsFromStates);
        }
        this.app.context.setOption({
          comments: this.allCommentsFromStates,
        });
      },
    };

    this.app.PmPlugins.add(
      'CommentDecorationPlugin',
      CommentDecorationPlugin('commentDecorationPlugin', options),
    );

    this.app.PmPlugins.add(
      'commentPlugin',
      CommentPlugin('commentPlugin', this.app),
    );

    const createOverlay = this.container.get('CreateOverlay');
    const layout = this.container.get('Layout');
    createOverlay(
      CommentBubbleComponent,
      {},
      {
        nodeType: '',
        markType: '',
        followCursor: false,
        selection: true,
      },
    );
    layout.addComponent('rightArea', RightArea);
  }

  register() {
    const commentConfig = this.config.get('config.CommentsService');
    const createMark = this.container.get('CreateMark');

    createMark(
      {
        comment: commentMark(commentConfig?.showTitle || false),
      },
      { toWaxSchema: true },
    );
  }
}
