import Service from '../../Service';
import EnableTrackChange from './EnableTrackChange';

class EnableTrackChangeService extends Service {
  boot() {}

  register() {
    this.container.bind('EnableTrackChange').to(EnableTrackChange);
  }
}

export default EnableTrackChangeService;
