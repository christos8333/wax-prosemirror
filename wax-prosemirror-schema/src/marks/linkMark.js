const link = {
  attrs: {
    href: { default: null },
    rel: { default: '' },
    target: { default: 'blank' },
    title: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(hook, next) {
        const href = hook.dom.getAttribute('href');
        const target = href && href.indexOf('#') === 0 ? '' : 'blank';
        Object.assign(hook, {
          href: hook.dom.getAttribute('href'),
          title: hook.dom.getAttribute('title'),
          target,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    // eslint-disable-next-line no-param-reassign
    hook.value = ['a', hook.node.attrs, 0];
    next();
  },
};

export default link;
