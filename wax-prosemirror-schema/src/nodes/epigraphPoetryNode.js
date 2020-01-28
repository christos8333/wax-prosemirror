const epigraphPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "epigraph-poetry" }
  },
  parseDOM: [
    {
      tag: "p.epigraph-poetry",
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

export default epigraphPoetry;
