const customtagInline = {
  excludes: 'cutomInline',

  attrs: {
    class: { default: null },
    tagName: ''
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'custom-tag-inline',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          tagname: hook.dom.getAttribute('tagName')
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
