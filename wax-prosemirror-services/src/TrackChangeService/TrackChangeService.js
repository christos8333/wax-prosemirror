import { Service } from 'wax-prosemirror-core';
import trackChangesNodes from './schema/trackChangesNodes';
import trackChangesMarks from './schema/trackChangesMarks';
import TrackChangePlugin from './plugins/TrackChangePlugin';
import HideShowPlugin from './plugins/HideShowPlugin';
import TrackChangeServices from './index';
import './trackChange.css';

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
