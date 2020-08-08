import { epigraphPoetryNode } from 'wax-prosemirror-schema';
import EpigraphPoetry from './EpigraphPoetry';
import Service from '../../Service';

class EpigraphPoetryService extends Service {
  // boot() {}

  register() {
    this.container.bind('EpigraphPoetry').to(EpigraphPoetry);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        epigraphPoetry: epigraphPoetryNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default EpigraphPoetryService;
