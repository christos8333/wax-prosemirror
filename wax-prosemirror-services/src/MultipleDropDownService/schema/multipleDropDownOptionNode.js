const multipleDropDownOptionNode = {
  attrs: {
    class: { default: 'multiple-drop-down-option' },
    id: { default: '' },
    options: { default: [] },
    correct: { default: '' },
  },
  group: 'inline questions',
  content: 'text*',
  inline: true,
  atom: true,
  defining: true,
  parseDOM: [
    {
      tag: 'span.multiple-drop-down-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          options: JSON.parse(dom.getAttribute('options')),
          correct: dom.getAttribute('correct'),
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
      },
      0,
    ];
  },
};

export default multipleDropDownOptionNode;
