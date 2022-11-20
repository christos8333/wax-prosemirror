import { Service } from 'wax-prosemirror-core';
import CustomTagInlineOverlayComponent from '../components/CustomTagInlineOverlayComponent';
import customtagInlineMark from './schema/customtagInlineMark';
import CustomTagInlineTool from './CustomTagInlineTool';

class CustomTagInlineService extends Service {
  boot() {
    const createOverlay = this.container.get('CreateOverlay');

    createOverlay(
      CustomTagInlineOverlayComponent,
      {},
      {
        nodeType: '',
        markType: 'customTagInline',
        followCursor: false,
        selection: true,
      },
    );
  }

  register() {
    this.container.bind('CustomTagInlineTool').to(CustomTagInlineTool);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        customTagInline: customtagInlineMark,
      },
      { toWaxSchema: true },
    );
  }
}

export default CustomTagInlineService;
