import { GetContentOnEnterPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';

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
