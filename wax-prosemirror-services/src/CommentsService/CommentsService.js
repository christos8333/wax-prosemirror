import { Service } from 'wax-prosemirror-core';
import CommentBubbleComponent from './components/ui/comments/CommentBubbleComponent';
import RightArea from './components/RightArea';
import commentMark from './schema/commentMark';
import CommentPlugin from './plugins/CommentPlugin';
import CopyPasteCommentPlugin from './plugins/CopyPasteCommentPlugin';
import { AnnotationPlugin } from './plugins/AnnotationPlugin';
import './comments.css';

export default class CommentsService extends Service {
  allCommentsFromStates = [];
  boot() {
    const commentsConfig = this.app.config.get('config.CommentsService');

    this.app.PmPlugins.add(
      'commentPlugin',
      CommentPlugin('commentPlugin', this.app.context),
    );

    this.app.PmPlugins.add(
      'copyPasteCommentPlugin',
      CopyPasteCommentPlugin('copyPasteCommentPlugin', this.app.context),
    );

    const options = {
      existingComments: () => {
        const map = new Map();
        if (commentsConfig.setComments().length > 0) {
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

        this.app.context.setOption({ comments: this.allCommentsFromStates });
      },
      onAnnotationListChange: () => true,
      document: '',
      field: 'annotations',
      instance: '',
    };

    this.app.PmPlugins.add(
      'AnnotationPlugin',
      AnnotationPlugin('AnnotationPlugin', options),
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
