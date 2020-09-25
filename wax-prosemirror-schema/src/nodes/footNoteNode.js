// TODO Write the node in WaxSchema
const getHTMLString = node => {
  const { textContent } = node;

  if (textContent) {
    let strContent = textContent;
    for (let i = 0; i < node.content.content[0].marks.length; i += 1) {
      const mark = node.content.content[0].marks[i];
      const { type: markType } = mark;
      const domDetails = markType.spec.toDOM(mark);
      const htmlAttrs = Object.keys(domDetails[1]).reduce(
        (str, key) => `${str}${key}="${domDetails[1][key]}"`,
        '',
      );
      const htmlTag = domDetails[0];
      strContent = `<${htmlTag} ${htmlAttrs}>${strContent}</${htmlTag}>`;
    }
    return strContent;
  }
};

const footnote = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => {
    console.log(getHTMLString(node));
    return ['footnote', node.attrs];
  },
  parseDOM: [
    {
      tag: 'footnote',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        };
      },
    },
  ],
};

export default footnote;
