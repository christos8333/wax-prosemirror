import { Service } from 'wax-prosemirror-core';
import DisplayServices from './index';

class DisplayBlockLevelService extends Service {
  // register() {
  //   this.config.pushToArray("services", DisplayServices);
  // }
  dependencies = DisplayServices;
}

export default DisplayBlockLevelService;
