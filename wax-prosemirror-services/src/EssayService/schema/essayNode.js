const essayNode = {
  attrs: {
    class: { default: 'essay' },
    id: { default: '' },
  },
  group: 'block questions',
  selectable: true,
  draggable: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.essay',
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

export default essayNode;
