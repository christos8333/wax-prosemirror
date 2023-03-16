import { Service } from 'wax-prosemirror-core';
import AnyStyleTool from './AnyStyleTool';
import AnyStyleToolGroupService from './AnyStyleToolGroupService/AnyStyleToolGroupService';
import ExternalAPIContentPlaceHolderPlugin from './plugins/ExternalAPIContentPlaceHolderPlugin';
import './anyStyle.css';

class ExternalAPIContentService extends Service {
  name = 'ExternalAPIContentService';

  boot() {
    this.app.PmPlugins.add(
      'ExternalAPIContentPlaceHolder',
      ExternalAPIContentPlaceHolderPlugin('ExternalAPIContentPlaceHolder'),
    );
  }

  register() {
    this.container.bind('AnyStyleTool').to(AnyStyleTool);
  }

  dependencies = [new AnyStyleToolGroupService()];
}

export default ExternalAPIContentService;
