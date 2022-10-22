const codeBlockNode = {
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  marks: 'comment insertion deletion',
  attrs: { params: { default: '' } },
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      getAttrs(dom) {
        return {
          params: dom.dataset.params,
        };
      },
    },
  ],
  toDOM(node) {
    return ['pre', { 'data-params': node.attrs.params }, ['code', 0]];
  },
};

export default codeBlockNode;
