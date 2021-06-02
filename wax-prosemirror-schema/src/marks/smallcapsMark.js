const smallcaps = {
  attrs: {
    class: { default: 'small-caps' },
  },
  // inclusive: false,
  parseDOM: [
    {
      tag: 'span.small-caps',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    hook.value = ['span', hook.node.attrs, 0];
    next();
  },
};

export default smallcaps;
