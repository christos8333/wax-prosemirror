const em = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM(hook, next) {
    hook.value = ['em', 0];
    next();
  },
};

export default em;
