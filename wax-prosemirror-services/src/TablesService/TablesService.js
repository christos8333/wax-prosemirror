import { Service } from 'wax-prosemirror-core';
import TablesServices from './index';
import FakeCursorPlugin from './plugins/FakeCursorPlugin';
import './table.css';

class TablesService extends Service {
  boot() {
    this.app.PmPlugins.add(
      'fakeCursorPlugin',
      FakeCursorPlugin('fakeCursorPlugin'),
    );
  }
  dependencies = TablesServices;
}

export default TablesService;
