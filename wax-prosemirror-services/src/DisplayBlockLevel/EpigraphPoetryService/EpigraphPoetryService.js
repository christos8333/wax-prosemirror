import { Service } from 'wax-prosemirror-core';
import { epigraphPoetryNode } from 'wax-prosemirror-schema';
import EpigraphPoetry from './EpigraphPoetry';

class EpigraphPoetryService extends Service {
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
