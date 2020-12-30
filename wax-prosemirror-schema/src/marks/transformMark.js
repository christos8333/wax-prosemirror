const transform = {
  excludes: 'transformCase',

  attrs: {
    style: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'transform',
      getAttrs(hook, next) {
        Object.assign(hook, {
          style: hook.dom.getAttribute('style'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    hook.value = ['transform', hook.node.attrs, 0]; // eslint-disable-line no-param-reassign
    next();
  },
};

export default transform;
