const trueFalseSingleCorrectContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'true-false-single-correct' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.true-false-single-correct',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default trueFalseSingleCorrectContainerNode;
