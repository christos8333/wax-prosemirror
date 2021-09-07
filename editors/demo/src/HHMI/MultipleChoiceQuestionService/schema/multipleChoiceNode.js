const multipleChoiceNode = {
  attrs: {
    class: { default: 'mutiple-choice-option' },
    id: { default: '' },
    correct: { default: false },
    feedback: { default: '' },
  },
  group: 'block',
  content: 'block*',
  // atom: true,
  parseDOM: [
    {
      tag: 'div.mutiple-choice-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default multipleChoiceNode;
