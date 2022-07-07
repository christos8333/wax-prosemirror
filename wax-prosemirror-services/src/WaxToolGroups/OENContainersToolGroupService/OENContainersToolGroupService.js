import Service from '../../Service';
import OENContainersToolGroup from './OENContainersToolGroup';
import OENAsideShortToolGroupService from '../OENAsideShortToolGroupService/OENAsideShortToolGroupService';
import OENAsideLongToolGroupService from '../OENAsideLongToolGroupService/OENAsideLongToolGroupService';

class OENContainersToolGroupService extends Service {
  register() {
    this.container.bind('OENContainersToolGroup').to(OENContainersToolGroup);
  }

  dependencies = [
    new OENAsideShortToolGroupService(),
    new OENAsideLongToolGroupService(),
  ];
}

export default OENContainersToolGroupService;
