import { SchemaHelpers } from 'wax-prosemirror-core';

const bulletListNode = {
  group: 'block',
  content: 'list_item+',
  attrs: {
    track: { default: [] },
  },
  parseDOM: [
    {
      tag: 'ul',
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
    hook.value = ['ul', attrs, 0];
    next();
  },
};

export default bulletListNode;
