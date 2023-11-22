import { Service } from 'wax-prosemirror-core';
import HighlightToolGroup from './HightlightToolGroup';

class TextHighlightToolGroupServices extends Service {
  register() {
    this.container.bind('HighlightToolGroup').to(HighlightToolGroup);
  }
}

export default TextHighlightToolGroupServices;
