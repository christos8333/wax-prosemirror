const NumericalAnswerContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'numerical-answer' },
    feedback: { default: '' },
    answerType: { default: '' },
    answersExact: { default: [] },
    answersRange: { default: [] },
    answersPrecise: { default: [] },
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
          answersRange: JSON.parse(dom.getAttribute('answersRange')),
          answersPrecise: JSON.parse(dom.getAttribute('answersPrecise')),
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
        answerType: node.attrs.answerType,
        answersExact: JSON.stringify(node.attrs.answersExact),
        answersRange: JSON.stringify(node.attrs.answersRange),
        answersPrecise: JSON.stringify(node.attrs.answersPrecise),
        id: node.attrs.id,
        class: node.attrs.class,
        feedback: node.attrs.feedback,
      },
    ];
  },
};

export default NumericalAnswerContainerNode;
