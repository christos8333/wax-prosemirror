import { Service } from 'wax-prosemirror-core';
import { paragraphContNode } from 'wax-prosemirror-schema';
import ParagraphContinued from './ParagraphContinued';

class ParagraphContinuedService extends Service {
  register() {
    this.container.bind('ParagraphContinued').to(ParagraphContinued);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        paragraphCont: paragraphContNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default ParagraphContinuedService;
