import { Service } from 'wax-prosemirror-core';
import AcceptTrackChange from './AcceptTrackChange';

class AcceptTrackChangeService extends Service {
  name = 'AcceptTrackChangeService';
  register() {
    this.container.bind('AcceptTrackChange').toDynamicValue(() => {
      return new AcceptTrackChange(this.config);
    });
  }
}

export default AcceptTrackChangeService;
