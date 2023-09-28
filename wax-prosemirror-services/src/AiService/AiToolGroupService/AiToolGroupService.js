import { Service } from 'wax-prosemirror-core';
import ToggleAi from './ToggleAi';

class AiToolGroupService extends Service {
  register() {
    this.container.bind('ToggleAi').to(ToggleAi);
  }
}

export default AiToolGroupService;
