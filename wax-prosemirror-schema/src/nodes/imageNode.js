import { SchemaHelpers } from 'wax-prosemirror-utilities';
const image = {
  // inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
    track: { default: [] },
  },
  group: 'figure',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          src: hook.dom.getAttribute('src'),
          title: hook.dom.getAttribute('title'),
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          alt: hook.dom.getAttribute('alt'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};
    let temp = '';
    if (hook.node.attrs.track.length) {
      attrs['data-track'] = JSON.stringify(hook.node.attrs.track);
      attrs['data-id'] = hook.node.attrs.id;
    }
    const { src, alt, title, id, track } = hook.node.attrs;
    hook.value = [
      'img',
      { src, alt, title, 'data-id': id, 'data-track': track },
    ];
    next();
  },
};

export default image;
