import Service from '../../Service';
import Display from './Display';

class DisplayToolGroupService extends Service {
  register() {
    this.container.bind('Display').to(Display);
  }
}

export default DisplayToolGroupService;
