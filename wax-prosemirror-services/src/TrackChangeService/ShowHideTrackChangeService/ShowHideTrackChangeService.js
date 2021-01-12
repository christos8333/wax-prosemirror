import Service from '../../Service';
import ShowHideTrackChange from './ShowHideTrackChange';

class ShowHideTrackChangeService extends Service {
  name = 'ShowHideTrackChangeService';
  // boot() {}

  register() {
    this.container.bind('ShowHideTrackChange').to(ShowHideTrackChange);
  }
}

export default ShowHideTrackChangeService;
