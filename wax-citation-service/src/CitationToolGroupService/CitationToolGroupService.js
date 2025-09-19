import { Service } from 'wax-prosemirror-core';
import Citation from './Citation';

class CitationToolGroupService extends Service {
  register() {
    this.container.bind('Citation').to(Citation);
  }
}

export default CitationToolGroupService;
