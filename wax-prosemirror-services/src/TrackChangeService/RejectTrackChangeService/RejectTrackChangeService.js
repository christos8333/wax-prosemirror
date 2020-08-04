import Service from '../../Service';
import RejectTrackChange from './RejectTrackChange';

class RejectTrackChangeService extends Service {
  name = 'RejectTrackChangeService';
  boot() {}

  register() {
    this.container.bind('RejectTrackChange').to(RejectTrackChange);
  }
}

export default RejectTrackChangeService;
