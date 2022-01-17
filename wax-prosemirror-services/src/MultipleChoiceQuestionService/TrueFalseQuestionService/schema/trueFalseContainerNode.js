const trueFalseContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'true-false' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.true-false',
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

export default trueFalseContainerNode;
