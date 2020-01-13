const image = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
    track: { default: [] }
  },
  group: "inline",
  draggable: true,
  parseDOM: [
    {
      tag: "img[src]",
      getAttrs(hook, next) {
        Object.assign(hook, {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          // track: parseTracks(hook.dom.dataset.track),
          alt: dom.getAttribute("alt")
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = {};
    let temp = "";
    // if (hook.node.attrs.track.length) {
    //   // attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    // }
    let { src, alt, title } = hook.node.attrs;
    hook.value = ["img", { src, alt, title }];
    next();
  }
};

export default image;
