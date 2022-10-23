import { Service } from 'wax-prosemirror-core';
import FindAndReplacePlugin from './plugins/FindAndReplacePlugin';
import FindAndReplace from './FindAndReplace';
import './findAndReplace.css';

class FindAndReplaceService extends Service {
  name = 'FindAndReplaceService';

  boot() {
    this.app.PmPlugins.add(
      'findAndReplacePlugin',
      FindAndReplacePlugin('findAndReplacePlugin'),
    );
  }

  register() {
    this.container.bind('FindAndReplace').to(FindAndReplace);
  }
}
export default FindAndReplaceService;
