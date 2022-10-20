import { Service } from 'wax-prosemirror-core';
import FillTheGap from './FillTheGap';

class FillTheGapToolGroupService extends Service {
  register() {
    this.container.bind('FillTheGap').to(FillTheGap);
  }
}

export default FillTheGapToolGroupService;
