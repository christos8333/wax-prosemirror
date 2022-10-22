const OenAsideNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    class: { default: '' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'aside',
      getAttrs(dom) {
        return {
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return [
      'aside',
      {
        class: node.attrs.class,
      },
      0,
    ];
  },
};

export default OenAsideNode;
