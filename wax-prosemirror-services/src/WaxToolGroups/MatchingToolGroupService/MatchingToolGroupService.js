import { Service } from 'wax-prosemirror-core';
import Matching from './Matching';

class MatchingToolGroupService extends Service {
  register() {
    this.container.bind('Matching').to(Matching);
  }
}

export default MatchingToolGroupService;
