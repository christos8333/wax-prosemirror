import { imageNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import Image from './Image';

class ImageService extends Service {
  name = 'ImageService';

  register() {
    this.container.bind('Image').to(Image);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        image: imageNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default ImageService;
