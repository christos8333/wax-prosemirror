import { Service } from 'wax-prosemirror-core';
import Notes from './Notes';

class NoteToolGroupService extends Service {
  register() {
    this.container.bind('Notes').to(Notes);
  }
}

export default NoteToolGroupService;
