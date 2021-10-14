const fillTheGapContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'fill-the-gap' },
  },
  group: 'block questions',
  defining: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.fill-the-gap',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default fillTheGapContainerNode;
