const questionTrueFalseNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'true-false-question-single' },
  },
  group: 'block questions',
  content: 'block+',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.true-false-question-single',
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

export default questionTrueFalseNode;
