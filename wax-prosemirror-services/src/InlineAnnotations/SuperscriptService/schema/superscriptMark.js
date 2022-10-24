const superscriptMark = {
  excludes: 'subscript',
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: (hook, next) => {
    hook.value = ['sup'];
    next();
  },
};

export default superscriptMark;
