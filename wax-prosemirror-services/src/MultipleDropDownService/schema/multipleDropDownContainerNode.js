const multipleDropDownContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'multiple-drop-down-container' },
    feedback: { default: '' },
  },
  group: 'block questions',
  atom: true,
  selectable: false,
  draggable: false,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.multiple-drop-down-container',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default multipleDropDownContainerNode;
