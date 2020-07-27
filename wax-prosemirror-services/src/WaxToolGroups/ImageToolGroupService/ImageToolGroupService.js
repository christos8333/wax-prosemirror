import Service from '../../Service';
import Images from './Images';

class ImageToolGroupService extends Service {
  register() {
    this.container.bind('Images').to(Images);
  }
}

export default ImageToolGroupService;
