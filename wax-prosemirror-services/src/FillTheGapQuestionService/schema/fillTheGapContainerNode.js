const fillTheGapContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'fill-the-gap' },
  },
  group: 'block questions',
  atom: true,
  draggable: true,
  selectable: true,
  defining: true,
  content: 'paragraph+',
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
