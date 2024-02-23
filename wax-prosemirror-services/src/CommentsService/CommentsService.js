import { Service } from 'wax-prosemirror-core';
import CommentBubbleComponent from './components/ui/comments/CommentBubbleComponent';
import RightArea from './components/RightArea';
import commentMark from './schema/commentMark';
import CommentPlugin from './plugins/CommentPlugin';
import CopyPasteCommentPlugin from './plugins/CopyPasteCommentPlugin';
import { AnnotationPlugin } from './plugins/AnnotationPlugin';
import './comments.css';

const PLUGIN_KEY = 'commentPlugin';

export default class CommentsService extends Service {
  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, CommentPlugin(PLUGIN_KEY));
    this.app.PmPlugins.add(
      'copyPasteCommentPlugin',
      CopyPasteCommentPlugin('copyPasteCommentPlugin', this.app.context),
    );

    const options = {
      styles: {
        rightFragment: '',
        leftFragment: '',
        normal: '',
        middleFragment: '',
      },
      onSelectionChange: items => console.log(items),
      onAnnotationListChange: items => console.log(items),
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
