import { Service } from 'wax-prosemirror-core';
import BottomInfoServices from './index';

class BottomInfoService extends Service {
  dependencies = BottomInfoServices;
}

export default BottomInfoService;
