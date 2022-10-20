import { Service } from 'wax-prosemirror-core';
import { GetContentOnEnterPlugin } from 'wax-prosemirror-plugins';

class EnterService extends Service {
  name = 'EnterService';

  boot() {
    this.app.PmPlugins.add(
      'getContentOnEnterPlugin',
      GetContentOnEnterPlugin(this.config),
    );
  }
}

export default EnterService;
