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
          tagNames: JSON.parse(hook.dom.dataset.tagNames),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    // eslint-disable-next-line no-param-reassign
    hook.value = [
      'custom-tag-inline',
      {
        class: hook.node.attrs.class,
        'data-tagNames': JSON.stringify(hook.node.attrs.tagNames),
      },
    ];
    next();
  },
};

export default customtagInline;
