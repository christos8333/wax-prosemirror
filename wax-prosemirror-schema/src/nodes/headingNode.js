/* eslint-disable no-param-reassign */
const heading = {
  attrs: {
    level: { default: 2 },
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [
    {
      tag: 'h2',
      attrs: { level: 2 },
    },
    {
      tag: 'h3',
      attrs: { level: 3 },
    },
    {
      tag: 'h4',
      attrs: { level: 4 },
    },
  ],
  toDOM(hook, next) {
    const attrs = {};
    hook.value = [`h${hook.node.attrs.level}`, attrs, 0];
    next();
  },
};

export default heading;
