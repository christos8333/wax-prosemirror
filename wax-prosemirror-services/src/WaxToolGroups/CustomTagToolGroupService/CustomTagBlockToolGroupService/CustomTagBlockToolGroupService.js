import Service from '../../../Service';
import CustomTagBlockToolGroup from './CustomTagBlockToolGroup';

class CustomTagBlockToolGroupService extends Service {
  register() {
    this.container.bind('CustomTagBlockToolGroup').to(CustomTagBlockToolGroup);
  }
}

export default CustomTagBlockToolGroupService;