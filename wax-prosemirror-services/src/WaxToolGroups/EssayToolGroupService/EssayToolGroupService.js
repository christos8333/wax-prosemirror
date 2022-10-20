import { Service } from 'wax-prosemirror-core';
import Essay from './Essay';

class EssayToolGroupService extends Service {
  register() {
    this.container.bind('Essay').to(Essay);
  }
}

export default EssayToolGroupService;
