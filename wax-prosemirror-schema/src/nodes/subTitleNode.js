const subtitle = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "cst" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.cst",
      getAttrs(dom) {
        return {
          class: dom.getAttribute("class"),
          track: parseTracks(dom.dataset.track)
        };
      }
    }
  ],
  toDOM(node) {
    const attrs = blockLevelToDOM(node);
    return ["p", attrs, 0];
  }
};

export default subtitle;
