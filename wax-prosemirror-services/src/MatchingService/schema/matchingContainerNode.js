const matchingContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'matching-container' },
  },
  group: 'block questions',
  atom: true,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.matching-container',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default matchingContainerNode;
