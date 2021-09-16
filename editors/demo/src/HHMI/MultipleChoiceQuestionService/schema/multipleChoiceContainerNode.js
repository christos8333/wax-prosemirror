const multipleChoiceContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'mutiple-choice' },
  },
  group: 'block',
  atom: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.mutiple-choice',
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

export default multipleChoiceContainerNode;
