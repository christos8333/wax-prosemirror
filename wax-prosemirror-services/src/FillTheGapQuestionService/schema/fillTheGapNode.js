const fillTheGapNode = {
  attrs: {
    id: { default: '' },
    class: { default: 'fill-the-gap' },
  },
  group: 'inline',
  content: 'text*',
  inline: true,
  atom: true,
  excludes: 'fill_the_gap',
  parseDOM: [
    {
      tag: 'span.fill-the-gap',
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
