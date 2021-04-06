const figureCaption = {
  content: 'inline*',
  group: 'figure',
  draggable: false,
  attrs: {
    class: { default: '' },
    // tabindex: { default: 0 },
  },
  toDOM: node => {
    return ['figcaption', node.attrs, 0];
  },
  parseDOM: [
    {
      tag: 'figcaption',
      getAttrs(dom) {
        return {
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
};

export default figureCaption;
