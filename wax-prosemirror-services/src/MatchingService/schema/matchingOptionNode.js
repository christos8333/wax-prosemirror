const matchingOptionNode = {
  attrs: {
    class: { default: 'matching-option' },
    id: { default: '' },
    isfirst: { default: false },
    answer: { default: '' },
    correct: { default: '' },
    options: { default: [] },
  },
  group: 'inline questions',
  content: 'text*',
  inline: true,
  atom: true,
  defining: true,
  parseDOM: [
    {
      tag: 'div.matching-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          isfirst: JSON.parse(dom.getAttribute('isfirst').toLowerCase()),
          answer: dom.getAttribute('answer'),
          correct: dom.getAttribute('correct'),
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
        isfirst: node.attrs.isfirst,
        answer: node.attrs.answer,
        correct: node.attrs.correct,
      },
      0,
    ];
  },
};

export default matchingOptionNode;
