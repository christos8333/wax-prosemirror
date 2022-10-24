const figureNode = {
  content: 'image* figcaption{0,1}',
  group: 'block',
  marks: '',
  parseDOM: [{ tag: 'figure' }],
  toDOM() {
    return ['figure', 0];
  },
};

export default figureNode;
