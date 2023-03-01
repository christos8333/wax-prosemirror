const OenAsideNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    id: { default: '' },
    class: { default: '' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'aside',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return [
      'aside',
      {
        id: node.attrs.id,
        class: node.attrs.class,
      },
      0,
    ];
  },
};

export default OenAsideNode;
