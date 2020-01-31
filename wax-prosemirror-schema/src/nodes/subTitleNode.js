const subtitle = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "cst" }
  },
  parseDOM: [
    {
      tag: "p.cst",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: dom.getAttribute("class")
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = { class: hook.node.attrs.class };
    hook.value = ["p", attrs, 0];
    next();
  }
};

export default subtitle;
