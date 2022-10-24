const customBlockNode = {
  content: 'inline*',
  group: 'block',
  priority: 0,
  defining: true,
  attrs: {
    class: { default: '' },
    type: { default: 'block' },
  },
  parseDOM: [
    {
      tag: 'p[data-type="block"]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          type: hook.dom.dataset.type,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class,
      'data-type': hook.node.attrs.type,
    };
    // eslint-disable-next-line no-param-reassign
    hook.value = ['p', attrs, 0];
    next();
  },
};

export default customBlockNode;
