import Service from '../Service';
import CustomService from './index';

class CustomTagService extends Service {
  dependencies = CustomService;
}

export default CustomTagService;