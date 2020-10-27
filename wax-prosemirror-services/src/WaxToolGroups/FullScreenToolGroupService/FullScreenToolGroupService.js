import Service from '../../Service';
import FullScreenTool from './FullScreenTool';

class FullScreenToolGroupService extends Service {
  register() {
    this.container.bind('FullScreenTool').to(FullScreenTool);
  }
}

export default FullScreenToolGroupService;
