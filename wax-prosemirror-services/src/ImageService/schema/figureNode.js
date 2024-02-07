const figureNode = {
  content: 'image* figcaption{0,1}',
  group: 'block',
  marks: '',
  parseDOM: [
    {
      tag: 'figure',
      getAttrs(hook, next) {
        next();
      },
    },
  ],
  toDOM() {
    return ['figure', 0];
  },
  toDOM(hook, next) {
    hook.value = ['figure', 0];
    next();
  },
};

export default figureNode;
