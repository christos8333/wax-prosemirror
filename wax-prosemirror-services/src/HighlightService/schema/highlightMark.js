const highlightMark = {
  attrs: {
    style: { default: null },
    class: { default: 'highlight' },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'span.highlight',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          style: hook.dom.getAttribute('style'),
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    // eslint-disable-next-line no-param-reassign
    hook.value = ['span', hook.node.attrs, 0];
    next();
  },
};

export default highlightMark;
