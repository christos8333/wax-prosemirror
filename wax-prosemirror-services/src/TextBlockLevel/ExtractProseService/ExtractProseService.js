import { Service } from 'wax-prosemirror-core';
import extractProseNode from './schema/extractProseNode';
import ExtractProse from './ExtractProse';

class ExtractProseService extends Service {
  register() {
    this.container.bind('ExtractProse').to(ExtractProse);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        extractProse: extractProseNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default ExtractProseService;
