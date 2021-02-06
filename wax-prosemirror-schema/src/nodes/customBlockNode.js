const customBlockNode = {
  content: 'inline*',
  group: 'block',
  priority: 0,
  defining: true,
  attrs: {
    class: { default: '' },
  },
  parseDOM: [
    {
      tag: 'custom-tag-block',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = { class: hook.attrs.class };
    return (hook.value = ['custom-tag-block', attrs, 0]);
  },
};

export default customBlockNode;
