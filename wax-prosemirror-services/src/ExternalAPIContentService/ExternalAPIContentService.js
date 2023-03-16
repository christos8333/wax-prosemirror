import { Service } from 'wax-prosemirror-core';
import ExternalAPIContentTool from './ExternalAPIContentTool';
import AnyStyleToolGroupService from './AnyStyleToolGroupService/AnyStyleToolGroupService';
import ExternalAPIContentPlaceHolderPlugin from './plugins/ExternalAPIContentPlaceHolderPlugin';
import './externalApiContent.css';

class ExternalAPIContentService extends Service {
  name = 'ExternalAPIContentService';

  boot() {
    this.app.PmPlugins.add(
      'ExternalAPIContentPlaceHolder',
      ExternalAPIContentPlaceHolderPlugin('ExternalAPIContentPlaceHolder'),
    );
  }

  register() {
    this.container.bind('ExternalAPIContentTool').to(ExternalAPIContentTool);
  }

  dependencies = [new AnyStyleToolGroupService()];
}

export default ExternalAPIContentService;
