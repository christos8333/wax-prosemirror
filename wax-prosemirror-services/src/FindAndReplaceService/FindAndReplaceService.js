import { Service } from 'wax-prosemirror-core';
import FindAndReplacePlugin from './plugins/FindAndReplacePlugin';
import FindAndReplace from './FindAndReplace';
import './findAndReplace.css';
import FindAndReplaceToolGroupService from './FindAndReplaceToolGroupService/FindAndReplaceToolGroupService';

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

  dependencies = [new FindAndReplaceToolGroupService()];
}
export default FindAndReplaceService;
