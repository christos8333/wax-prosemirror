import Service from '../Service';
import BaseServices from './index';

class BaseService extends Service {
  dependencies = BaseServices;
}

export default BaseService;
