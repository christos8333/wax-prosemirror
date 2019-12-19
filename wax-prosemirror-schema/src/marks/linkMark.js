const link = {
  attrs: {
    href: { default: null },
    rel: { default: "" },
    target: { default: "blank" },
    title: { default: null }
  },
  inclusive: false,
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: dom => {
        const href = dom.getAttribute("href");
        const target = href && href.indexOf("#") === 0 ? "" : "blank";
        return {
          href: dom.getAttribute("href"),
          title: dom.getAttribute("title"),
          target
        };
      }
    }
  ],
  toDOM(hook, next, node) {
    hook.value = ["a", node.attrs, 0];
    next();
  }
};

export default link;
