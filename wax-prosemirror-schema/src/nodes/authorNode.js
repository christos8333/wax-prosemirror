const author = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "author" }
  },
  parseDOM: [
    {
      tag: "p.author",
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
    console.log(hook);
    next();
  }
};

export default author;
