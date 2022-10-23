import { Service } from 'wax-prosemirror-core';
import ShowHideTrackChange from './ShowHideTrackChange';

class ShowHideTrackChangeService extends Service {
  name = 'ShowHideTrackChangeService';

  register() {
    this.container.bind('ShowHideTrackChange').to(ShowHideTrackChange);
  }
}

export default ShowHideTrackChangeService;
