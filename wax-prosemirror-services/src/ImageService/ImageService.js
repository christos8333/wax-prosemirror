import {
  imageNode,
  figureCaptionNode,
  figureNode,
} from 'wax-prosemirror-schema';
import { PlaceHolderPlugin, captionPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import Image from './Image';
import './image.css';
import AltComponent from './AltComponent';

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
    const createOverlay = this.container.get('CreateOverlay');
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

    createOverlay(
      AltComponent,
      {},
      {
        nodeType: 'image',
        findInParent: false,
        markType: '',
        followCursor: false,
        selection: false,
      },
    );
  }
}

export default ImageService;
