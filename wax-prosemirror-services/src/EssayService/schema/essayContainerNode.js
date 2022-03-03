const essayContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'essay' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: true,
  content: 'block+',
  parseDOM: [
    {
      tag: 'div.essay',
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

export default essayContainerNode;
