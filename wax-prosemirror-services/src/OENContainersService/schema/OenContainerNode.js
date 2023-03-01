const OenContainerNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    id: { default: '' },
    class: { default: '' },
    type: { default: 'content_structure_element' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'div[data-type="content_structure_element"]',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          type: dom.dataset.type,
        };
      },
    },
  ],
  toDOM(node) {
    return [
      'div',
      {
        id: node.attrs.id,
        class: node.attrs.class,
        'data-type': node.attrs.type,
      },
      0,
    ];
  },
};

export default OenContainerNode;
