const NumericalAnswerContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'numerical-answer' },
    feedback: { default: '' },
    answerType: { default: '' },
  },
  group: 'block questions',
  atom: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.numerical-answer',
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

export default NumericalAnswerContainerNode;
