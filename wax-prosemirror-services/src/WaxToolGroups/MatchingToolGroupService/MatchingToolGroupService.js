import Service from '../../Service';
import Matching from './Matching';

class MatchingToolGroupService extends Service {
  register() {
    this.container.bind('Matching').to(Matching);
  }
}

export default MatchingToolGroupService;
