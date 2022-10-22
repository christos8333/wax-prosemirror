import { Service } from 'wax-prosemirror-core';
import extractPoetryNode from './schema/extractPoetryNode';
import ExtractPoetry from './ExtractPoetry';

class ExtractPoetryService extends Service {
  register() {
    this.container.bind('ExtractPoetry').to(ExtractPoetry);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        extractPoetry: extractPoetryNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default ExtractPoetryService;
