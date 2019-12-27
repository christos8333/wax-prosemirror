const list_item = {
  content: "block+",
  attrs: {
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "li",
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = {};
    if (hook.node.attrs.track.length) {
      attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    }
    hook.value = ["li", attrs, 0];
    next();
  },
  defining: true
};

export default list_item;
