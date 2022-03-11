import Service from '../Service';
import MatchingQuestion from './MatchingQuestion';

class MatchingService extends Service {
  name = 'MatchingService';

  boot() {}

  register() {
    this.container.bind('MatchingQuestion').to(MatchingQuestion);
  }
}

export default MatchingService;
