import { Service } from 'wax-prosemirror-core';
import CustomTagInlineToolGroup from './CustomTagInlineToolGroup';

class CustomTagInlineToolGroupService extends Service {
  register() {
    this.container.bind('CustomTagInline').to(CustomTagInlineToolGroup);
  }
}

export default CustomTagInlineToolGroupService;
