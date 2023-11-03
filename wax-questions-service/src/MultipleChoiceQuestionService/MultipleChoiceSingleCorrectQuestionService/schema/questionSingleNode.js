const questionSingleNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'multiple-choice-question-single' },
  },
  group: 'block questions',
  content: 'block*',
  // defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.multiple-choice-question-single',
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

export default questionSingleNode;
