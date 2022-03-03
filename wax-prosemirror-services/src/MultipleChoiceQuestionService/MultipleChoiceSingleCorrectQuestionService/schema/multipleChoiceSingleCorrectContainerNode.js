const multipleChoiceSingleCorrectContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'multiple-choice-single-correct' },
    correctId: { default: '' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.multiple-choice-single-correct',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          class: dom.getAttribute('class'),
          correctId: dom.getAttribute('correctId'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default multipleChoiceSingleCorrectContainerNode;
