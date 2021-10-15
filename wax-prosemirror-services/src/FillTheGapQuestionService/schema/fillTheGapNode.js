const fillTheGapNode = {
  group: 'inline',
  content: 'text*',
  inline: true,
  atom: true,
  excludes: 'fill_the_gap',
  attrs: {
    id: { default: '' },
    class: { default: 'fill-the-gap' },
  },
  parseDOM: [
    {
      tag: 'span',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => {
    return ['span', node.attrs, 0];
  },
};

export default fillTheGapNode;
