import Service from '../../Service';
import DisplayText from './DisplayText';

class DisplayTextToolGroupService extends Service {
  register() {
    this.container.bind('DisplayText').to(DisplayText);
  }
}

export default DisplayTextToolGroupService;
