const trueFalseSingleCorrectNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'true-false-single-correct-option' },
    correct: { default: false },
    answer: { default: false },
    feedback: { default: '' },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.true-false-single-correct-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          correct: JSON.parse(dom.getAttribute('correct').toLowerCase()),
          answer: JSON.parse(dom.getAttribute('answer').toLowerCase()),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default trueFalseSingleCorrectNode;
