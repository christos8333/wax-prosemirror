const smallcaps = {
  attrs: {
    class: { default: "small-caps" }
  },
  // inclusive: false,
  parseDOM: [
    {
      tag: "span.small-caps",
      getAttrs(dom) {
        return { class: dom.getAttribute("class") };
      }
    }
  ],
  toDOM(node) {
    return ["span", node.attrs, 0];
  }
};

export default smallcaps;
