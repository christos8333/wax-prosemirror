const OenSectionNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    id: { default: '' },
    class: { default: 'section' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'section',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          type: dom.dataset.group,
        };
      },
    },
  ],
  toDOM(node) {
    return ['section', node.attrs, 0];
  },
};

export default OenSectionNode;
