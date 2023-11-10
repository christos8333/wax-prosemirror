const NumericalAnswerContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'numerical-answer' },
    feedback: { default: '' },
    answerType: { default: '' },
    answersExact: { default: [] },
  },
  group: 'block questions',
  atom: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.numerical-answer',
      getAttrs(dom) {
        return {
          answersExact: JSON.parse(dom.getAttribute('answersExact')),
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          feedback: dom.getAttribute('feedback'),
          answerType: dom.getAttribute('answerType'),
        };
      },
    },
  ],
  toDOM(node) {
    return [
      'div',
      {
        id: node.attrs.id,
        class: node.attrs.class,
        answersExact: JSON.stringify(node.attrs.answersExact),
        feedback: node.attrs.feedback,
        answerType: node.attrs.answerType,
      },
    ];
  },
};

export default NumericalAnswerContainerNode;
