const sourceNote = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "source-note" }
  },
  parseDOM: [
    {
      tag: "p.source-note",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute("class")
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

export default sourceNote;
