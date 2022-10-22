import { Service } from 'wax-prosemirror-core';
import sourceNoteNode from './schema/sourceNoteNode';
import SourceNote from './SourceNote';

class SourceNoteService extends Service {
  register() {
    this.container.bind('SourceNote').to(SourceNote);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        sourceNote: sourceNoteNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default SourceNoteService;
