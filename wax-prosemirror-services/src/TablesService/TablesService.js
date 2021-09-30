import Service from '../Service';
import TablesServices from './index';

class TablesService extends Service {
  dependencies = TablesServices;
}

export default TablesService;
