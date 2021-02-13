const customtagInline = {
  attrs: {
    class: { default: null },
    tags: [],
    type: { default: 'inline' },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'span[data-type="inline"]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          tags: JSON.parse(hook.dom.dataset.tags),
          type: hook.dom.dataset.type,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    // eslint-disable-next-line no-param-reassign
    hook.value = [
      'span',
      {
        class: hook.node.attrs.class,
        'data-type': hook.node.attrs.type,
        'data-tags': JSON.stringify(hook.node.attrs.tags),
      },
    ];
    next();
  },
};

export default customtagInline;
