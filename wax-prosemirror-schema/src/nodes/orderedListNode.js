const orderedlist = {
  group: "block",
  content: "list_item+",
  attrs: {
    order: { default: 1 }
  },
  parseDOM: [
    {
      tag: "ol",
      getAttrs(hook, next) {
        Object.assign(hook, {
          order: hook.dom.hasAttribute("start")
            ? +hook.dom.getAttribute("start")
            : 1
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = {};
    if (hook.node.attrs.order !== 1) {
      attrs.start = hook.node.attrs.order;
    }
    hook.value = ["ol", attrs, 0];
    next();
  }
};

export default orderedlist;
