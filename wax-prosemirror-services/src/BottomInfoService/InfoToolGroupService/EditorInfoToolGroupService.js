import { Service } from 'wax-prosemirror-core';
import InfoToolGroup from './InfoTool';

class EditorInfoToolGroupService extends Service {
  name = 'EditorInfoToolGroupService';
  register() {
    this.container.bind('InfoToolGroup').to(InfoToolGroup);
  }
}
export default EditorInfoToolGroupService;
