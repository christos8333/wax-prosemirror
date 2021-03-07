import { SchemaHelpers } from 'wax-prosemirror-utilities';

const bulletlist = {
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
    hook.value = ['ul', attrs, 0];
    next();
  },
};

export default bulletlist;
