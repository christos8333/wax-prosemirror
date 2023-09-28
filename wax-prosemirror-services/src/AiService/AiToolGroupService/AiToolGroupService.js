import { Service } from 'wax-prosemirror-core';
import ToggleAiTool from './ToggleAiTool';

class AiToolGroupService extends Service {
  register() {
    this.container.bind('ToggleAiTool').to(ToggleAiTool);
  }
}

export default AiToolGroupService;
