const multipleChoiceContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'mutiple-choice' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'multiple_choice+',
  parseDOM: [
    {
      tag: 'div.mutiple-choice',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default multipleChoiceContainerNode;
