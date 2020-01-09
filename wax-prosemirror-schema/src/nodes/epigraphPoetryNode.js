const epigraphPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "epigraph-poetry" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.epigraph-poetry",
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

export default epigraphPoetry;
