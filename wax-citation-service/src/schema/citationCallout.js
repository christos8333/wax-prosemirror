const citationCallout = {
  attrs: {
    id: { default: '' },
    class: { default: 'citation-callout' },
  },
  group: 'inline',
  content: 'text*',
  inline: true,
  atom: true,
  excludes: 'citation_callout',
  parseDOM: [
    {
      tag: 'span.citation-callout',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => {
    return ['span', node.attrs, 0];
  },
};

export default citationCallout;
