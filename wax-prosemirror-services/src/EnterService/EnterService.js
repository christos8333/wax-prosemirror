import { Service } from 'wax-prosemirror-core';
import GetContentOnEnterPlugin from './plugins/GetContentOnEnterPlugin';

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
