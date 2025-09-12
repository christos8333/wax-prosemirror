const citationsDataNode = {
  attrs: {
    text: { default: 'This is uneditable content at the end of the document.' },
  },
  content: 'text*',
  group: 'block',
  atom: true,
  selectable: false,
  draggable: false,
  toDOM(node) {
    return ['div', { class: 'citations-data' }, node.attrs.text];
  },
  parseDOM: [
    {
      tag: 'div.citations-data',
      getAttrs(dom) {
        return { text: dom.textContent };
      },
    },
  ],
};

export default citationsDataNode;
