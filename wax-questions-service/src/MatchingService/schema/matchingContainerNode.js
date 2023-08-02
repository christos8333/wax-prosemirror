const matchingContainerNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'matching-container' },
    options: { default: [] },
    feedback: { default: '' },
  },
  group: 'block questions',
  atom: true,
  selectable: true,
  draggable: false,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.matching-container',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          feedback: dom.getAttribute('feedback'),
          options: JSON.parse(dom.getAttribute('options')),
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
        options: JSON.stringify(node.attrs.options),
        feedback: node.attrs.feedback,
      },
      0,
    ];
  },
};

export default matchingContainerNode;
