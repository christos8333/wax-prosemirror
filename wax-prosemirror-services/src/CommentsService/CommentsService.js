import Service from '../Service';
import { commentMark } from 'wax-prosemirror-schema';
import { RightArea, CommentBubbleComponent } from 'wax-prosemirror-components';
import { CommentPlugin } from 'wax-prosemirror-plugins';

const PLUGIN_KEY = 'commentPlugin';

export default class CommentsService extends Service {
  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, CommentPlugin(PLUGIN_KEY));
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
