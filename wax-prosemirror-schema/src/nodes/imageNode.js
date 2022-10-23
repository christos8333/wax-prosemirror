// import { SchemaHelpers } from 'wax-prosemirror-core';

const image = {
  attrs: {
    id: { default: '' },
    src: {},
    alt: { default: '' },
    title: { default: null },
    // track: { default: [] },
    fileid: { default: null },
  },
  group: 'figure',
  draggable: false,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          src: hook.dom.getAttribute('src'),
          title: hook.dom.getAttribute('title'),
          id: hook.dom.dataset.id,
          // track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          alt: hook.dom.getAttribute('alt'),
          fileid: hook.dom.dataset.fileid,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};

    if (hook.node.attrs.track && hook.node.attrs.track.length) {
      // attrs['data-track'] = JSON.stringify(hook.node.attrs.track);
      attrs['data-id'] = hook.node.attrs.id;
    }

    const { src, alt, title, id, track, fileid } = hook.node.attrs;

    // eslint-disable-next-line no-param-reassign
    hook.value = [
      'img',
      {
        src,
        alt,
        title,
        'data-id': id,
        // 'data-track': track,
        'data-fileid': fileid,
      },
    ];
    next();
  },
};

export default image;
