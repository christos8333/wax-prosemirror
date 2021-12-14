import Service from '../Service';
import ListsServices from './index';

class ListsService extends Service {
  name = 'ListsService';
  dependencies = ListsServices;
}

export default ListsService;
