// TODO Write the node in WaxSchema
const footnote = {
  group: 'inline',
  content: 'block*',
  inline: true,
  atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => {
    return ['footnote', node.attrs, 0];
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
