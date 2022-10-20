import { Service } from 'wax-prosemirror-core';
import Undo from './Undo';

class UndoService extends Service {
  register() {
    this.container.bind('Undo').to(Undo);
  }
}

export default UndoService;
