const multipleDropDownOptionNode = {
  attrs: {
    class: { default: 'multiple-drop-down-option' },
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
      tag: 'span.multiple-drop-down-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          // isfirst: JSON.parse(dom.getAttribute('isfirst').toLowerCase()),
          // answer: JSON.parse(dom.getAttribute('answer').toLowerCase()),
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
        // isfirst: node.attrs.isfirst,
        // answer: JSON.stringify(node.attrs.answer),
      },
      0,
    ];
  },
};

export default multipleDropDownOptionNode;
