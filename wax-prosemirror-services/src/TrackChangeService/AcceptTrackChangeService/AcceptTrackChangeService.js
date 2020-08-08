import Service from '../../Service';
import AcceptTrackChange from './AcceptTrackChange';

class AcceptTrackChangeService extends Service {
  name = 'AcceptTrackChangeService';
  // boot() {}

  register() {
    this.container.bind('AcceptTrackChange').to(AcceptTrackChange);
  }
}

export default AcceptTrackChangeService;
