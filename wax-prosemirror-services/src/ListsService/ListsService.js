import Service from '../Service';
import ListsServices from './index';
import './lists.css';

class ListsService extends Service {
  name = 'ListsService';
  dependencies = ListsServices;
}

export default ListsService;
