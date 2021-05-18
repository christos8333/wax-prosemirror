const footnote = {
  group: 'notes inline',
  content: 'inline*',
  inline: true,
  atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => {
    if (node) {
      return ['footnote', node.attrs];
    }
  },
  parseDOM: [
    {
      tag: 'footnote',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        };
      },
    },
  ],
};

export default footnote;
