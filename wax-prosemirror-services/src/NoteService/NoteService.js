import { footNoteNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import Note from './Note';
import NoteComponent from './NoteComponent';

class NoteService extends Service {
  name = 'NoteService';

  boot() {
    const layout = this.container.get('Layout');
    layout.addComponent('notesArea', NoteComponent);
  }

  register() {
    const createNode = this.container.get('CreateNode');
    this.container.bind('Note').to(Note);

    createNode({
      footnote: footNoteNode,
    });
  }
}

export default NoteService;
