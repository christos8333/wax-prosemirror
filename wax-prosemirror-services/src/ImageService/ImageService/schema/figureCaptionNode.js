const figureCaptionNode = {
  content: 'inline*',
  group: 'figure',
  draggable: false,
  attrs: {
    id: { default: '' },
    class: { default: '' },
    // tabindex: { default: 0 },
  },
  parseDOM: [
    {
      tag: 'figcaption',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => {
    return ['figcaption', node.attrs, 0];
  },
};

export default figureCaptionNode;
