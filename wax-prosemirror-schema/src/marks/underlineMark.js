const underline = {
  parseDOM: [{ tag: 'u' }],
  toDOM: (hook, next) => {
    // eslint-disable-next-line no-param-reassign
    hook.value = ['u'];
    next();
  },
};

export default underline;
