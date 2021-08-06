const multipleChoiceNode = {
  attrs: {
    id: { default: '' },
    correct: { default: false },
    feedback: { default: false },
  },
  group: 'block',
  content: 'block+',
  // atom: true,
  toDOM: node => ['multiple-choice', node.attrs, 0],
  parseDOM: [
    {
      tag: 'multiple-choice',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        };
      },
    },
  ],
};

export default multipleChoiceNode;
