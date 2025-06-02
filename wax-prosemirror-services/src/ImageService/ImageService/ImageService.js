import { Service } from 'wax-prosemirror-core'
import { imageNode, figureCaptionNode, figureNode } from './schema'
import PlaceHolderPlugin from './plugins/placeHolderPlugin'
import captionPlugin from './plugins/captionPlugin'
import selectFigureOnCutPlugin from './plugins/selectFigureOnCutPlugin'
import Image from './Image'
import AltComponent from './AltComponent'
import LongDescComponent from './LongDescComponent'
import ImageToolGroupService from './ImageToolGroupService/ImageToolGroupService'
import './image.css'

class ImageService extends Service {
  name = 'ImageService'

  boot() {
    this.app.PmPlugins.add(
      'selectFigureOnCutPlugin',
      selectFigureOnCutPlugin('selectFigureOnCutPlugin'),
    )
    this.app.PmPlugins.add(
      'imagePlaceHolder',
      PlaceHolderPlugin('imagePlaceHolder'),
    )
    this.app.PmPlugins.add('caption', captionPlugin('caption'))
  }

  register() {
    this.container.bind('Image').to(Image)
    const createNode = this.container.get('CreateNode')
    const createOverlay = this.container.get('CreateOverlay')
    createNode({
      figure: figureNode,
    })

    createNode(
      {
        image: imageNode,
      },
      { toWaxSchema: true },
    )
    createNode(
      {
        figcaption: figureCaptionNode,
      },
      // ,
      // { toWaxSchema: true },
    )

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
    )

    createOverlay(
      LongDescComponent,
      {},
      {
        nodeType: 'image',
        findInParent: false,
        markType: '',
        followCursor: false,
        selection: false,
      },
    )
  }

  dependencies = [new ImageToolGroupService()]
}

export default ImageService
