export default {
  nodes: {
    doc: {
      content: 'block+',
    },
    text: {
      group: 'inline',
    },
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br'];
      },
    },
    paragraph: {
      group: 'block',
      content: 'inline*',
      attrs: {
        class: { default: 'paragraph' },
      },
      parseDOM: [
        {
          tag: 'p.paragraph',
          getAttrs(dom) {
            return {
              class: dom.getAttribute('class'),
            };
          },
        },
      ],
      toDOM(node) {
        return ['p', node.attrs, 0];
      },
    },
  },
  marks: {},
};
