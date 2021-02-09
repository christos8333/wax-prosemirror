const figureCaption = {
  content: 'inline*',
  group: 'figure',
  marks: 'strong link',
  parseDOM: [{ tag: 'figcaption' }],
  toDOM(node) {
    return ['figcaption', 0];
  },
};

export default figureCaption;
