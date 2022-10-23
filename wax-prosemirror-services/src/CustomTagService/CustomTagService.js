import { Service } from 'wax-prosemirror-core';
import CustomService from './index';

class CustomTagService extends Service {
  dependencies = CustomService;
}

export default CustomTagService;
