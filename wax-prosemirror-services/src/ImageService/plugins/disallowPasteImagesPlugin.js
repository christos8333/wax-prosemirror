/* eslint-disable no-param-reassign */
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
          if (node.type.name === 'image') {
            node.attrs.src = '';
            node.attrs.alt = '';
            imageFound = true;
          }
          if (node.type.name === 'figure') {
            node.lastChild.attrs.src = '';
            node.lastChild.attrs.alt = '';
            imageFound = true;
          }
        });
        if (imageFound) onWarning();
        return slice;
      },
    },
  });
};
