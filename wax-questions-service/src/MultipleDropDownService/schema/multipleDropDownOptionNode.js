const multipleDropDownOptionNode = {
  attrs: {
    class: { default: 'multiple-drop-down-option' },
    id: { default: '' },
    options: { default: [] },
    correct: { default: '' },
    answer: { default: '' },
  },
  group: 'inline questions',
  inline: true,
  atom: true,
  parseDOM: [
    {
      tag: 'span.multiple-drop-down-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          options: JSON.parse(dom.getAttribute('options')),
          correct: dom.getAttribute('correct'),
          answer: dom.getAttribute('answer'),
        };
      },
    },
  ],
  toDOM(node) {
    return [
      'span',
      {
        id: node.attrs.id,
        class: node.attrs.class,
        options: JSON.stringify(node.attrs.options),
        correct: node.attrs.correct,
        answer: node.attrs.answer,
      },
    ];
  },
};

export default multipleDropDownOptionNode;
