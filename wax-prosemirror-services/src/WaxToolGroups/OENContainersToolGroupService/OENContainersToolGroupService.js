import Service from '../../Service';
import OENContainersToolGroup from './OENContainersToolGroup';

class OENContainersToolGroupService extends Service {
  register() {
    this.container.bind('OENContainersToolGroup').to(OENContainersToolGroup);
  }
}

export default OENContainersToolGroupService;
