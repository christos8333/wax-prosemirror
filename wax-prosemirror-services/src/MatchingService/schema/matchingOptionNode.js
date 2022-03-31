const matchingOptionNode = {
  attrs: {
    class: { default: 'matching-option' },
    id: { default: '' },
    isfirst: { default: false },
    correct: { default: false },
    answer: { default: false },
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
          correct: JSON.parse(dom.getAttribute('correct').toLowerCase()),
          answer: JSON.parse(dom.getAttribute('answer').toLowerCase()),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default matchingOptionNode;
