const extractProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "extract-prose" }
  },
  parseDOM: [
    {
      tag: "p.extract-prose",
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

export default extractProse;
