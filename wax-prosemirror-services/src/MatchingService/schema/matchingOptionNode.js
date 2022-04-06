const matchingOptionNode = {
  attrs: {
    class: { default: 'matching-option' },
    id: { default: '' },
    isfirst: { default: false },
    answer: { default: {} },
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
          answer: JSON.parse(dom.getAttribute('answer').toLowerCase()),
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
        answer: JSON.stringify(node.attrs.answer),
        feedback: node.attrs.feedback,
      },
      0,
    ];
  },
};

export default matchingOptionNode;
