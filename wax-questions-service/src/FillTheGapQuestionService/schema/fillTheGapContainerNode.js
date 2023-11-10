const fillTheGapContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'fill-the-gap' },
    feedback: { default: '' },
  },
  group: 'block questions',
  isolating: true,
  content: 'paragraph+',
  parseDOM: [
    {
      tag: 'div.fill-the-gap',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default fillTheGapContainerNode;
