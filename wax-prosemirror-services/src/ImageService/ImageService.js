import { imageNode } from 'wax-prosemirror-schema';
import { PlaceHolderPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import Image from './Image';

const PLUGIN_KEY = 'imagePlaceHolder';

class ImageService extends Service {
  name = 'ImageService';

  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, PlaceHolderPlugin(PLUGIN_KEY));
  }

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
