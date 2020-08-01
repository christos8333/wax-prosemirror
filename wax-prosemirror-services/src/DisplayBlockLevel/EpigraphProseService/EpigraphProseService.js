import { epigraphProseNode } from 'wax-prosemirror-schema';
import EpigraphProse from './EpigraphProse';
import Service from '../../Service';

class EpigraphProseService extends Service {
  boot() {}

  register() {
    this.container.bind('EpigraphProse').to(EpigraphProse);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        epigraphProse: epigraphProseNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default EpigraphProseService;
