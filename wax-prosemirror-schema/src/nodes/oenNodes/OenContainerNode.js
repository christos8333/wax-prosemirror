const OenContainerNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    class: { default: '' },
    type: { default: 'content_structure_element' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'div[data-type="content_structure_element"]',
      getAttrs(dom) {
        return {
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
        class: node.attrs.class,
        'data-type': node.attrs.type,
      },
      0,
    ];
  },
};

export default OenContainerNode;
