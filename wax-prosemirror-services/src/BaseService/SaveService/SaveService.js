import { Service } from 'wax-prosemirror-core';
import Save from './Save';

class SaveService extends Service {
  name = 'SaveService';
  register() {
    this.container.bind('Save').to(Save);
  }
}

export default SaveService;
