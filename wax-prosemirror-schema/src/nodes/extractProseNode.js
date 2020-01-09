const extractProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "extract-prose" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.extract-prose",
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

export default extractProse;
