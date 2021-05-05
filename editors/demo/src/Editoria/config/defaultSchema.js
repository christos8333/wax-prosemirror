const defaultSchema = {
  nodes: {
    doc: {
      content: 'inline*',
    },
    text: {
      group: 'inline',
    },
    paragraph: null,
    hard_break: null,
    title: {
      group: 'inline',
      content: 'inline*',
      inline: true,
      parseDOM: [
        {
          tag: 'title',
        },
      ],
      toDOM(node) {
        return ['title', node.attrs, 0];
      },
    },
  },
  marks: {},
};

export default defaultSchema;
