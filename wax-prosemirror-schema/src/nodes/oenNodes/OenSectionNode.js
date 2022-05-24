const OenSectionNode = {
  content: 'block+',
  group: 'block',
  attrs: {
    class: { default: 'section' },
  },
  defining: true,
  parseDOM: [
    {
      tag: 'section.section',
      getAttrs(dom) {
        return {
          class: dom.getAttribute('class'),
          type: dom.dataset.group,
        };
      },
    },
  ],
  toDOM(node) {
    return ['section', node.attrs, 0];
  },
};

export default OenSectionNode;
