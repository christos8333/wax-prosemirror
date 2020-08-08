import { trackChangesMarks, trackChangesNodes } from 'wax-prosemirror-schema';
import Service from '../Service';
import TrackChangeServices from './index';

class TrackChangeService extends Service {
  boot() {}

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
