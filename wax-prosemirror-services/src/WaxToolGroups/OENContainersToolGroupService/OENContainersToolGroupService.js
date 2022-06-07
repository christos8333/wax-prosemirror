import Service from '../../Service';
import OENTools from './OENTools';

class OENContainersToolGroupService extends Service {
  register() {
    this.container.bind('OENTools').to(OENTools);
  }
}

export default OENContainersToolGroupService;
