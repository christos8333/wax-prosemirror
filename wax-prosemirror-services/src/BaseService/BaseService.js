import { Service } from 'wax-prosemirror-core';
import BaseServices from './index';

class BaseService extends Service {
  dependencies = BaseServices;
}

export default BaseService;
