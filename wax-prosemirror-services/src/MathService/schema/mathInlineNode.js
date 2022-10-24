const mathInlineNode = {
  group: 'inline math',
  content: 'text*',
  inline: true,
  atom: true,
  toDOM: () => ['math-inline', { class: 'math-node' }, 0],
  parseDOM: [
    {
      tag: 'math-inline',
    },
  ],
};

export default mathInlineNode;
