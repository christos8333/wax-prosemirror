const multipleChoiceSingleCorrectContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'multiple-choice-single-correct' },
    singleCorrect: { default: true },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'multiple_choice_single_correct+',
  parseDOM: [
    {
      tag: 'div.multiple-choice-single-correct',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          class: dom.getAttribute('class'),
          singleCorrect: dom.getAttribute('singleCorrect'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default multipleChoiceSingleCorrectContainerNode;
