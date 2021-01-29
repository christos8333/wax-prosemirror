import CustomTagInlineTool from './CustomTagInlineTool';
import Service from '../../Service';
import { CustomTagInlineOverlayComponent } from 'wax-prosemirror-components';
import { customtagInlineMark } from 'wax-prosemirror-schema';

class CustomTagInlineService extends Service {

  boot() {
    const createOverlay = this.container.get('CreateOverlay');

    createOverlay(
      CustomTagInlineOverlayComponent,
      {},
      {
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