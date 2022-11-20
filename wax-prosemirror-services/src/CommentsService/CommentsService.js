import { Service } from 'wax-prosemirror-core';
import CommentBubbleComponent from './components/ui/comments/CommentBubbleComponent';
import RightArea from './components/RightArea';
import commentMark from './schema/commentMark';
import CommentPlugin from './plugins/CommentPlugin';
import CopyPasteCommentPlugin from './plugins/CopyPasteCommentPlugin';
import './comments.css';

const PLUGIN_KEY = 'commentPlugin';

export default class CommentsService extends Service {
  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, CommentPlugin(PLUGIN_KEY));
    this.app.PmPlugins.add(
      'copyPasteCommentPlugin',
      CopyPasteCommentPlugin('copyPasteCommentPlugin', this.app.context),
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
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        comment: commentMark,
      },
      { toWaxSchema: true },
    );
  }
}
