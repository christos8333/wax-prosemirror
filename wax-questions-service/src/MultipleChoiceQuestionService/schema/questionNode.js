const questionNode = {
  attrs: {
    class: { default: 'multiple-choice-question' },
    id: { default: '' },
  },
  group: 'block questions',
  content: 'block+',
  defining: true,

  parseDOM: [
    {
      tag: 'div.multiple-choice-question',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default questionNode;
