import { Service } from 'wax-prosemirror-core';
import TablesServices from './index';
import './table.css';

class TablesService extends Service {
  dependencies = TablesServices;
}

export default TablesService;
