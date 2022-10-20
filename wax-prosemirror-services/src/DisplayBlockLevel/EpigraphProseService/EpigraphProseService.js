import { Service } from 'wax-prosemirror-core';
import { epigraphProseNode } from 'wax-prosemirror-schema';
import EpigraphProse from './EpigraphProse';

class EpigraphProseService extends Service {
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
