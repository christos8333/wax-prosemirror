import { Service } from 'wax-prosemirror-core';
import TrackOptions from './TrackOptions';

class TrackOptionsToolGroupService extends Service {
  register() {
    this.container.bind('TrackOptions').to(TrackOptions);
  }
}

export default TrackOptionsToolGroupService;
