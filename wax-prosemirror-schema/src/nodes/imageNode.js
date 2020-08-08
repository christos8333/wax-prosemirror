const image = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
    track: { default: [] },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          src: hook.dom.getAttribute('src'),
          title: hook.dom.getAttribute('title'),
          // track: parseTracks(hook.dom.dataset.track),
          alt: hook.dom.getAttribute('alt'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};
    let temp = '';
    // if (hook.node.attrs.track.length) {
    //   // attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    // }
    const { src, alt, title } = hook.node.attrs;
    hook.value = ['img', { src, alt, title }];
    next();
  },
};

export default image;
