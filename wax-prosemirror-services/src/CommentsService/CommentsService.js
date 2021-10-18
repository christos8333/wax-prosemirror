import { commentMark } from 'wax-prosemirror-schema';
import { RightArea, CommentBubbleComponent } from 'wax-prosemirror-components';
import { CommentPlugin, CopyPasteCommentPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';

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
      {
        showComment: activeViewId => activeViewId === 'main',
        group: 'main',
      },
      {
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
