import Service from '../../Service';
import TrackChange from './TrackChange';

class TrackChangeToolGroupService extends Service {
  register() {
    this.container.bind('TrackChange').to(TrackChange);
  }
}

export default TrackChangeToolGroupService;
