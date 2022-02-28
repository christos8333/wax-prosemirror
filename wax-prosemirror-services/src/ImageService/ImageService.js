import {
  imageNode,
  figureCaptionNode,
  figureNode,
} from 'wax-prosemirror-schema';
import { PlaceHolderPlugin, captionPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import Image from './Image';
import './image.css';

class ImageService extends Service {
  name = 'ImageService';

  boot() {
    this.app.PmPlugins.add(
      'imagePlaceHolder',
      PlaceHolderPlugin('imagePlaceHolder'),
    );
    this.app.PmPlugins.add('caption', captionPlugin('caption'));
  }

  register() {
    this.container.bind('Image').to(Image);
    const createNode = this.container.get('CreateNode');
    createNode({
      figure: figureNode,
    });

    createNode(
      {
        image: imageNode,
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        figcaption: figureCaptionNode,
      },
      // ,
      // { toWaxSchema: true },
    );
  }
}

export default ImageService;
