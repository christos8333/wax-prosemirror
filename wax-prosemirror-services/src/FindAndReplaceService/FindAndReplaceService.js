import Service from '../Service';
import FindAndReplace from './FindAndReplace';

class FindAndReplaceService extends Service {
  name = 'FindAndReplaceService';

  boot() {}

  register() {
    this.container.bind('FindAndReplace').to(FindAndReplace);
  }
}
export default FindAndReplaceService;
