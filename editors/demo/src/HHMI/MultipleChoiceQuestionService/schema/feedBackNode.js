const feedBackNode = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  // atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => ['feedback', node.attrs, 0],
  parseDOM: [
    {
      tag: 'feedback',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        };
      },
    },
  ],
};

export default feedBackNode;
