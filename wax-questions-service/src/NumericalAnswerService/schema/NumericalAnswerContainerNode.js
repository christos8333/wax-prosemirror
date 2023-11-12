const NumericalAnswerContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'numerical-answer' },
    feedback: { default: '' },
    answerType: { default: '' },
    answersExact: { default: [] },
    answerExact: { default: '' },
    answersRange: { default: [] },
    answerRange: { default: '' },
    answersPrecise: { default: [] },
    answerPrecise: { default: '' },
  },
  group: 'block questions',
  isolating: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.numerical-answer',
      getAttrs(dom) {
        return {
          answersExact: JSON.parse(dom.getAttribute('answersExact')),
          answerExact: dom.getAttribute('answerExact'),
          answersRange: JSON.parse(dom.getAttribute('answersRange')),
          answerRange: dom.getAttribute('answerRange'),
          answersPrecise: JSON.parse(dom.getAttribute('answersPrecise')),
          answerPrecise: dom.getAttribute('answerPrecise'),
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
        answerExact: node.attrs.answerExact,
        answersRange: JSON.stringify(node.attrs.answersRange),
        answerRange: node.attrs.answerRange,
        answersPrecise: JSON.stringify(node.attrs.answersPrecise),
        answerPrecise: node.attrs.answerPrecise,
        id: node.attrs.id,
        class: node.attrs.class,
        feedback: node.attrs.feedback,
      },
    ];
  },
};

export default NumericalAnswerContainerNode;
