import { Service } from 'wax-prosemirror-core';
import ExternalAPIContent from './ExternalAPIContent';

class ExternalAPIContentToolGroupService extends Service {
  register() {
    this.container.bind('ExternalAPIContent').to(ExternalAPIContent);
  }
}

export default ExternalAPIContentToolGroupService;
