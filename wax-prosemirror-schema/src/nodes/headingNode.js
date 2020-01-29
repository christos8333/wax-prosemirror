const heading = {
  attrs: {
    level: { default: 1 }
  },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [
    {
      tag: "h1",
      attrs: { level: 1 }
    },
    {
      tag: "h2",
      attrs: { level: 2 }
    },
    {
      tag: "h3",
      attrs: { level: 3 }
    }
  ],
  toDOM(hook, next) {
    const attrs = {};
    hook.value = [`h${hook.node.attrs.level}`, attrs, 0];
    next();
  }
};

export default heading;
