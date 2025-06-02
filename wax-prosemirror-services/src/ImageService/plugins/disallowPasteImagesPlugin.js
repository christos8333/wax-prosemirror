/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { Plugin, PluginKey } from 'prosemirror-state';

const disallowPasteImagesPlugin = new PluginKey('disallowPasteImagesPlugin');

export default onWarning => {
  return new Plugin({
    key: disallowPasteImagesPlugin,
    props: {
      transformPasted: slice => {
        const {
          content: { content },
        } = slice;

        let imageFound = false;
        content.forEach(node => {
          if (
            node.type.name === 'image' &&
            !Object.keys(node.attrs.extraData).length === 0
          ) {
            node.attrs.id = uuidv4();
            node.attrs.src = '';
            node.attrs.alt = '';
            imageFound = true;
          }

          if (node.type.name === 'figure') {
            if (
              node.firstChild &&
              node.firstChild.type.name === 'image' &&
              !Object.keys(node.firstChild.attrs.extraData).length === 0
            ) {
              node.firstChild.attrs.id = uuidv4();
              node.firstChild.attrs.src = '';
              node.firstChild.attrs.alt = '';
              imageFound = true;
            } else if (
              node.lastChild &&
              node.lastChild.type.name === 'image' &&
              !Object.keys(node.lastChild.attrs.extraData).length === 0
            ) {
              node.lastChild.attrs.id = uuidv4();
              node.lastChild.attrs.src = '';
              node.lastChild.attrs.alt = '';
              imageFound = true;
            }
          }
        });
        if (imageFound) onWarning();

        return slice;
      },
    },
  });
};
