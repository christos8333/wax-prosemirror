import { trackChangesMarks, trackChangesNodes } from 'wax-prosemirror-schema';
import { TrackChangePlugin, HideShowPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import TrackChangeServices from './index';

class TrackChangeService extends Service {
  boot() {
    this.app.PmPlugins.add(
      'trackChangePlugin',
      TrackChangePlugin('trackChangePlugin'),
    );
    this.app.PmPlugins.add('hideShowPlugin', HideShowPlugin('hideShowPlugin'));
  }

  register() {
    const createMark = this.container.get('CreateMark');
    const createNode = this.container.get('CreateNode');

    Object.keys(trackChangesMarks).forEach(mark => {
      createMark(
        {
          [mark]: trackChangesMarks[mark],
        },
        { toWaxSchema: true },
      );
    });

    Object.keys(trackChangesNodes).forEach(node => {
      createNode(
        {
          [node]: trackChangesNodes[node],
        },
        { toWaxSchema: true },
      );
    });
  }

  dependencies = TrackChangeServices;
}

export default TrackChangeService;
