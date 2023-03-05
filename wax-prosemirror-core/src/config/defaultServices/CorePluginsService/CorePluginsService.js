import Service from '../../../Service';
import FakeCursorPlugin from '../../plugins/FakeCursorPlugin';

export default class CorePluginsService extends Service {
  boot() {
    // this.app.PmPlugins.add(
    //   'fakeCursorPlugin',
    //   FakeCursorPlugin('fakeCursorPlugin'),
    // );
  }
}
