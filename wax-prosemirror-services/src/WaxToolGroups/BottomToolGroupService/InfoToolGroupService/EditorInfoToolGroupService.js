import { Service } from 'wax-prosemirror-core';
import InfoToolGroup from './InfoTool';

class EditorInfoToolGroupServices extends Service {
  name = 'EditorInfoToolGroupServices';
  register() {
    this.container.bind('InfoToolGroup').to(InfoToolGroup);
  }
}
export default EditorInfoToolGroupServices;
