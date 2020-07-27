import Service from '../../Service';
import Text from './Text';

class TextToolGroupService extends Service {
  register() {
    this.container.bind('Text').to(Text);
  }
}

export default TextToolGroupService;
