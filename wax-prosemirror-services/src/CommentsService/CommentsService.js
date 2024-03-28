import { Service } from 'wax-prosemirror-core';
import * as Y from 'yjs';
import CommentBubbleComponent from './components/ui/comments/CommentBubbleComponent';
import RightArea from './components/RightArea';
import commentMark from './schema/commentMark';
import CommentPlugin from './plugins/CommentPlugin';
// import CopyPasteCommentPlugin from './plugins/CopyPasteCommentPlugin';
import { CommentDecorationPlugin } from './plugins/CommentDecorationPlugin';
import './comments.css';

export default class CommentsService extends Service {
  allCommentsFromStates = [];
  boot() {
    // this.app.PmPlugins.add(
    //   'copyPasteCommentPlugin',
    //   CopyPasteCommentPlugin('copyPasteCommentPlugin', this.app.context),
    // );
    const commentsConfig = this.app.config.get('config.CommentsService');

    this.app.PmPlugins.add(
      'commentPlugin',
      CommentPlugin('commentPlugin', this.app.context),
    );

    const options = {
      existingComments: () => {
        const doc = new Y.Doc();
        const map = doc.getMap('prosemirror-demo');
        // const ymapNested = new Y.Map();
        // map.set('my nested map', ymapNested);
        if (commentsConfig.setComments().length > 0) {
          console.log('how many');
          commentsConfig.setComments().forEach(value => {
            map.set(value.id, value);
          });
        }
        return map;
      },
      onSelectionChange: items => {
        this.allCommentsFromStates = this.allCommentsFromStates.filter(
          comm =>
            (items.find(item => item.id === comm.id) || {}).id !== comm.id,
        );
        this.allCommentsFromStates = this.allCommentsFromStates.concat([
          ...items,
        ]);
        commentsConfig.getComments(this.allCommentsFromStates);
        if (this.app.context.options.resolvedComment) {
          this.allCommentsFromStates = this.allCommentsFromStates.filter(
            comm => {
              return comm.id !== this.app.context.options.resolvedComment;
            },
          );
        }
        this.app.context.setOption({ comments: this.allCommentsFromStates });
      },
    };

    this.app.PmPlugins.add(
      'CommentDecorationPlugin',
      CommentDecorationPlugin('commentDecorationPlugin', options),
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
