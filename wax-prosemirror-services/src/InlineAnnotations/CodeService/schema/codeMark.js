const codeMark = {
  parseDOM: { tag: 'code' },
  toDOM(hook, next) {
    hook.value = ['code', 0];
    next();
  },
};

export default codeMark;
