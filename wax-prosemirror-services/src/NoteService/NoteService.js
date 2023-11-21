import { Service } from 'wax-prosemirror-core';
import footNoteNode from './schema/footNoteNode';
import Note from './Note';
import NoteComponent from './NoteComponent';
import NoteToolGroupService from './NoteToolGroupService/NoteToolGroupService';
import './note.css';

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

  dependencies = [new NoteToolGroupService()];
}

export default NoteService;
