import { SchemaHelpers } from 'wax-prosemirror-utilities';

const orderedlist = {
  group: 'block',
  content: 'list_item+',
  attrs: {
    order: { default: 1 },
    track: { default: [] },
  },
  parseDOM: [
    {
      tag: 'ol',
      getAttrs(hook, next) {
        Object.assign(hook, {
          order: hook.dom.hasAttribute('start')
            ? +hook.dom.getAttribute('start')
            : 1,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};
    if (hook.node.attrs.order !== 1) {
      attrs.start = hook.node.attrs.order;
    }
    if (hook.node.attrs.track && hook.node.attrs.track.length) {
      attrs['data-track'] = JSON.stringify(hook.node.attrs.track);
    }
    hook.value = ['ol', attrs, 0];
    next();
  },
};

export default orderedlist;
