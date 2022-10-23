import { Service } from 'wax-prosemirror-core';
import TrackOptionsTool from './TrackOptionsTool';

class TrackOptionsService extends Service {
  name = 'TrackOptionsService';

  register() {
    this.container.bind('TrackOptionsTool').to(TrackOptionsTool);
  }
}
export default TrackOptionsService;
