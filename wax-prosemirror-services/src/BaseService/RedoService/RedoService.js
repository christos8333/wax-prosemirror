import { Service } from 'wax-prosemirror-core';
import Redo from './Redo';

class RedoService extends Service {
  // boot() {}

  register() {
    this.container.bind('Redo').to(Redo);
  }
}

export default RedoService;
