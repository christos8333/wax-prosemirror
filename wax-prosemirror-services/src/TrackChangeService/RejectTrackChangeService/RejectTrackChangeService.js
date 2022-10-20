import { Service } from 'wax-prosemirror-core';
import RejectTrackChange from './RejectTrackChange';

class RejectTrackChangeService extends Service {
  name = 'RejectTrackChangeService';

  register() {
    this.container.bind('RejectTrackChange').toDynamicValue(() => {
      return new RejectTrackChange(this.config);
    });
  }
}

export default RejectTrackChangeService;
