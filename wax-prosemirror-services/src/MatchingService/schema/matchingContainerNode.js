const matchingContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'matching-container' },
    answers: { default: [] },
    feedback: { default: '' },
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
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default matchingContainerNode;
