import { Service } from 'wax-prosemirror-core';
import EnableTrackChange from './EnableTrackChange';

class EnableTrackChangeService extends Service {
  name = 'EnableTrackChangeService';

  register() {
    this.container.bind('EnableTrackChange').toDynamicValue(() => {
      return new EnableTrackChange(this.config);
    });
  }
}

export default EnableTrackChangeService;
