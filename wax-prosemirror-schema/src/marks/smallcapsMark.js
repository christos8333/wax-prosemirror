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
  toDOM(hook, next) {
    hook.value = ["span", hook.node.attrs, 0];
    next();
  }
};

export default smallcaps;
