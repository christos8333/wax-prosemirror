const mathDisplayNode = {
  group: 'block math',
  content: 'text*',
  atom: true,
  code: true,
  toDOM: () => ['math-display', { class: 'math-node' }, 0],
  parseDOM: [
    {
      tag: 'math-display',
    },
  ],
};

export default mathDisplayNode;
