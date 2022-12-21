import { SchemaHelpers } from 'wax-prosemirror-core';

const listItemNode = {
  content: 'paragraph block*',
  attrs: {
    track: { default: [] },
  },
  parseDOM: [
    {
      tag: 'li',
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};
    if (hook.node.attrs.track && hook.node.attrs.track.length) {
      attrs['data-track'] = JSON.stringify(hook.node.attrs.track);
    }
    // eslint-disable-next-line no-param-reassign
    hook.value = ['li', attrs, 0];
    next();
  },
  defining: true,
};

export default listItemNode;
