const customtagInline = {
  attrs: {
    class: { default: null },
    tagNames: { default: [] },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'custom-tag-inline',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          tagNames: hook.dom.getAttribute('tagNames'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    hook.value = ['custom-tag-inline', hook.node.attrs, 0]; // eslint-disable-line no-param-reassign
    next();
  },
};

export default customtagInline;
